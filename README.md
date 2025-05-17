# School Forum Service (Backend with DDD & Clean Architecture)

This project is part of my journey exploring Node.js and advanced backend architecture at Rocketseat, built during my studies at Rocketseat. The School Forum Service is a forum system designed for a school environment where students and teachers can interact through questions, answers, and comments.

## Features

- **Q&A System**  
  Students can ask questions and teachers can answer them. Additionally, anyone can comment on both questions and answers.

- **Smart Notifications**  
  Users get notified when their questions receive answers or when an answer is marked as the best.

- **Attachments & Watched Lists**  
  You can add and update attachments on questions and answers, and track changes through watched lists.

- **Editing & Deleting Content**  
  Users can edit titles, content, slugs, and attachments of their questions and answers, as well as delete comments, answers, or questions.

## Technologies Used

| Technology               | Purpose                                                  |
|--------------------------|----------------------------------------------------------|
| **Node.js**              | Backend runtime                                          |
| **TypeScript**           | Static typing for better safety and developer experience |
| **Domain-Driven Design (DDD)** | Clear organization of domain logic                 |
| **Clean Architecture**   | Separation of concerns for maintainability               |
| **Aggregate Roots & Value Objects** | Enforce business rules and data integrity     |
| **Domain Events**        | Reactive, decoupled handling of internal processes       |
| **Watched Lists**        | Tracking changes, especially for attachments             |
| **Test-Driven Development (TDD)** | Development approach focused on testing         |
| **Vitest**               | Unit testing framework                                   |

## Testing

This project was built with testing from the ground up. Key scenarios covered include:

- Creating, editing, and deleting questions, answers, and comments  
- Marking best answers and sending notifications  
- Behavior of watched lists for attachments  
- Validation and business rules enforced within aggregates  

## My Journey

This was one of the projects that pushed me to deepen my understanding during my studies at Rocketseat. I learned how to model complex domains, manage aggregates, and implement reactive architecture with domain events. Working with TDD helped me write reliable, clear, and maintainable code. Focusing on backend domain logic without API routes was essential to understand how to build robust and scalable systems from the core. This project truly solidified my knowledge in clean architecture and domain-driven design—tools I now use daily as a software engineer.