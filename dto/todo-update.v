module dto

pub struct TodoDtoUpdate {
pub:
  id i64 [required]
  name string [required]
  deadline u64 [required]
  description string [required]
  done bool [required]
}
