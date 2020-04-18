use lambda_http::{Body, IntoResponse, Response};
use serde::{Serialize};
use serde_json;

#[derive(Serialize, Debug)]
pub struct SuccessBody<T>
where
    T: Serialize,
{
    pub results: Vec<T>,
}

#[derive(Serialize, Debug)]
pub struct ErrorBody {
    #[serde(skip_serializing)]
    pub code: u16,
    pub message: String,
}

#[derive(Serialize, Debug)]
#[serde(untagged, rename_all = "camelCase")]
pub enum ResponseBody<T>
where
    T: Serialize,
{
    Success(SuccessBody<T>),
    Error(ErrorBody),
}

impl<T> IntoResponse for ResponseBody<T>
where
    T: Serialize,
{
    fn into_response(self) -> Response<Body> {
        match self {
            ResponseBody::Success(body) => {
                let body_string = serde_json::to_string(&body).unwrap();
                Response::builder()
                    .header("Content-Type", "application/json")
                    .status(200)
                    .body(Body::Text(body_string))
                    .unwrap()
            }
            ResponseBody::Error(err_body) => {
                let body_string = serde_json::to_string(&err_body).unwrap();
                Response::builder()
                    .header("Content-Type", "application/json")
                    .status(err_body.code)
                    .body(Body::Text(body_string))
                    .unwrap()
            }
        }
    }
}
