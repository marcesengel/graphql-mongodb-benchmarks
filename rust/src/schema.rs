use async_graphql::Object;

pub struct User {
    name: &'static str,
    age: u32,
}

fn build_user() -> User {
    User {
        name: "John Cena",
        age: 30,
    }
}

#[Object]
impl User {
    async fn name(&self) -> &'static str {
        self.name
    }

    async fn age(&self) -> u32 {
        self.age
    }

    async fn todos(&self) -> Vec<Todo> {
        let mut todos = Vec::new();
        for _ in 0..15 {
            todos.push(build_todo());
        }

        todos
    }
}

pub struct Todo {
    title: &'static str,
    description: &'static str,
}

fn build_todo() -> Todo {
    Todo {       
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    }
}

#[Object]
impl Todo {
    async fn title(&self) -> &'static str {
        self.title
    }

    async fn description(&self) -> &'static str {
        self.description
    }

    async fn owner(&self) -> User {
        build_user()
    }

    async fn watchers(&self) -> Vec<User> {
        let mut watchers = Vec::new();
        for _ in 0..5 {
            watchers.push(build_user());
        }

        watchers
    } 
}

pub struct Query;

#[Object]
impl Query {
    async fn me(&self) -> User {
        build_user()
    }

    async fn todos(&self) -> Vec<Todo> {
        let mut todos = Vec::new();
        for _ in 0..15 {
            todos.push(build_todo());
        }

        todos
    }
}
