use std::collections::VecDeque;

#[derive(Debug)]
pub struct Dequeue<T> {
    queue: VecDeque<T>,
}

impl<T> Dequeue<T> {
    pub fn new() -> Self {
        Self {
            queue: VecDeque::new(),
        }
    }

    pub fn enqueue(&mut self, task: T) {
        self.queue.push_back(task);
    }

    pub fn dequeue(&mut self) -> Option<T> {
        self.queue.pop_front()
    }

    pub fn is_empty(&self) -> bool {
        self.queue.is_empty()
    }

    pub fn len(&self) -> usize {
        self.queue.len()
    }
}
