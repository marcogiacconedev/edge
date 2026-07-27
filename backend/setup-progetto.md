
## 1. Architettura
```
Frontend (Angular / React)
        |
        |  HTTPS + JWT
        v
Spring Boot Backend
 ├── Auth (JWT / OAuth2)
 ├── REST API
 ├── File Storage
 └── DB (PostgreSQL / MySQL)
```

Sul server:
- Nginx → reverse proxy + HTTPS
- Java 17+
- Spring Boot
- Database
- (opzionale) Docker

## 2. Stack
1. Backend
- Java 17 o 21 (LTS)
- Spring Boot 3.x
- Spring Web → REST API
- Spring Security → autenticazione
- JWT (stateless) → perfetto per SPA
- Spring Data JPA + Hibernate
- PostgreSQL (consigliato) o MySQL
- Spring Validation
- Springdoc OpenAPI (Swagger)

2. Storage
- File system locale (ok all’inizio)
- Volume dedicato (es. /var/app/uploads)
- S3-compatible (MinIO / AWS S3) → migliore a lungo termine

## 3. Inizializzazione
1. Con Spring Initializr installare le dipendenze
- Spring Web
- Spring Security
- Spring Data JPA
- Validation
- PostgreSQL Driver
- Lombok
- Springdoc OpenAPI

2. Struttura
```
src/main/java/com/backend/app
├── config
│   └── CorsConfig.java
├── controller
│   ├── AuthController.java
│   └── UserConfig.java
├── dto
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   ├── SignupRequest.java
│   └── UserResponse.java
├── model
│   └── User.java
├── repository
│   └── UserRepository.java
├── security
│   ├── JwtAuthenticationFilter.java
│   └── SecurityConfig.java
├── service
│   ├── AuthService.java
│   └── UserService.java
├── util
│   └── JwtUtil.java
└── Application.java

```