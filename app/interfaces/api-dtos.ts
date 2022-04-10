export type i64 = number;
export type u64 = number;

export interface Todo {
  id: i64;
  name: string;
  deadline: u64; // Date in UNIX Timestamp
  description: string;
  done: boolean;
}

export interface TodoDtoCreate {
  name: string; // Required
  deadline: u64; // Required
  description: string; // Required
  done: boolean; // Optional, default: false
}

// Unfortunately V doesn't fully support optional values on structs yet
// So to update our Todo we need to provide full Todo object.
// Also framework that I use - VEX doesn't allow
// More then one param route, so you must provide id here aswell.
export interface TodoDtoUpdate {
  id: i64; // Required
  name: string; // Required
  deadline: u64; // Required
  description: string; // Required
  done: boolean; // Required
}

export interface ApiError {
  error: string;
  status_code: number;
}
