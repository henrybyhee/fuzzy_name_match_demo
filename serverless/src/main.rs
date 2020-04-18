use std::error::Error;

use lambda_http::{lambda, Body, IntoResponse, Request};
use lambda_runtime::{error::HandlerError, Context};
use serde_json::{self, Value};

mod request;
use request::RequestBody;
mod response;
use response::{ErrorBody, ResponseBody, SuccessBody};

use name_match::ensemble::{Ensemble, EnsembleResult};
use name_match::jaro::compare::JaroWinklerMatcher;
use name_match::prelude::*;
use name_match::soundex::compare::SoundexJaccardMatcher;

fn main() -> Result<(), Box<dyn Error>> {
    simple_logger::init_with_level(log::Level::Info)?;
    lambda!(router);
    Ok(())
}

// Call handler function based on request method
fn router(req: Request, _: Context) -> Result<impl IntoResponse, HandlerError> {
    let body = match req.into_body() {
        Body::Text(value)=> value,
        _ => {
            let response = ResponseBody::<String>::Error(ErrorBody {
                code: 400,
                message: String::from("No body found"),
            });
            return Ok(response.into_response());
        }
    };
    let body: Value = serde_json::from_str(&body[..])?;
    let request_body = match RequestBody::from_serde_value(&body) {
        Ok(body) => body,
        Err(err) => {
            let response = ErrorBody {
                code: err.code,
                message: err.message,
            };
            return Ok(ResponseBody::<String>::Error(response).into_response());
        }
    };

    // Initialize Ensemble
    let jw = JaroWinklerMatcher::default();
    let soundex = SoundexJaccardMatcher::default();
    let matchers: Vec<Box<dyn Matcher>> = vec![Box::new(jw), Box::new(soundex)];
    let mut ensemble = Ensemble::new(matchers);
    ensemble.set_equal_weight();

    // Compare names and compute score
    let list_of_names = request_body.against.iter().map(|x| &x[..]).collect();
    let mut ensemble_results =
        ensemble.get_ensemble_result_arr(&request_body.query_name, list_of_names);

    // Sort in Descending order, Highest Similarity first.
    ensemble_results.sort_by(|a, b| b.score.partial_cmp(&a.score).unwrap());

    let success_response = SuccessBody::<EnsembleResult> {
        results: ensemble_results,
    };
    Ok(ResponseBody::<EnsembleResult>::Success(success_response).into_response())
}
