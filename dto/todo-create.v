module dto

pub struct TodoDtoCreate {
pub:
  name string [required]
  deadline u64 [required]
  description string [required]
  done bool
}
