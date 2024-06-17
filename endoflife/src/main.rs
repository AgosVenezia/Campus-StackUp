use endoflife::rust;
use serde::Serialize;
use serde::Deserialize;
use serde_json;

fn main() {
    let json_str: &str = r#"{
        "releaseDate": "2024-05-02",
        "eol": false,
        "latest": "1.78.0",
        "latestReleaseDate": "2024-05-02",
        "lts": false
    }"#;

    let json_object: Result<RustSingleCycle, Error> = serde_json::from_str::<rust::RustSingleCycle>(json_str);

    /*println!(
        "{:?}",
        json_object
    );*/

    /*let new_json_str: Result<{unknown}, Error> = serde_json::from_value(value);*/

    if let Ok(data: RustSingleCycle) = json_object {
        //println!("{:#?}", data);

        // we serialise the data back into JSON string
        let serialised_data: String = serde_json::to_string_pretty(&data).unwrap();

        println!("{}", serialised_data);

    } else {
        println!("Not able to parse to json. Invalid data format?");
    }

} fn main