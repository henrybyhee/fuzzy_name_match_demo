use super::response::ErrorBody;
use serde_json::Value;

#[derive(Debug)]
pub struct RequestBody {
    pub query_name: String,
    pub against: Vec<String>,
}

impl RequestBody {
    pub fn from_serde_value(obj: &Value) -> Result<Self, ErrorBody> {
        // Validate "queryName"
        let mut query_name = String::new();
        if let Value::String(name) = &obj["queryName"] {
            query_name.push_str(&name);
        } else {
            return Err(ErrorBody {
                code: 400,
                message: String::from("queryName must be in String format."),
            });
        }
        // Validate "against"
        let mut against: Vec<String> = Vec::new();
        if let Value::Array(list) = &obj["against"] {
            for name_value in list.iter() {
                if let Value::String(name) = name_value {
                    against.push(name.to_owned());
                } else {
                    return Err(ErrorBody {
                        code: 400,
                        message: String::from("against must be in Array<String> format."),
                    });
                }
            }
        } else {
            return Err(ErrorBody {
                code: 400,
                message: String::from("against must be in Array<String> format."),
            });
        }

        Ok(RequestBody {
            query_name,
            against,
        })
    }
}

#[cfg(test)]
mod test {
    use super::RequestBody;
    use serde_json::{self, Value};

    #[test]
    fn test_successful() {
        let request = r#"
            {
                "queryName": "John Doe",
                "against": ["John Kissinger", "John Barnes"]
            }
        "#;

        let request_json: Value = serde_json::from_str(&request).unwrap();

        let request_body = RequestBody::from_serde_value(&request_json).ok().unwrap();

        assert_eq!(request_body.query_name, "John Doe");
        assert_eq!(request_body.against[0], "John Kissinger");
    }

    #[test]
    fn test_missing_key() {
        let request = r#"
            {
                "queryName": "John Doe"
            }
        "#;
        let request_json: Value = serde_json::from_str(&request).unwrap();
        let err = RequestBody::from_serde_value(&request_json).err().unwrap();
        assert_eq!(err.message, "against must be in Array<String> format.");
    }
}
