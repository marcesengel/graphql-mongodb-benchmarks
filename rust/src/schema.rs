use async_graphql::Object;

pub struct User {
    name: &'static str,
    age: i32,
}

#[Object]
impl User {
    async fn name(&self) -> &'static str {
        self.name
    }

    async fn age(&self) -> i32 {
        self.age
    }
}

pub struct Query;

#[Object]
impl Query {
    async fn me(&self) -> User {
        User {
            name: "John Cena",
            age: 30,
        }
    }
}
