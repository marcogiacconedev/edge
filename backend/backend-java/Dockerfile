# ===============================
# STAGE 1: build con Maven
# ===============================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copia solo il pom per sfruttare la cache
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copia il resto del progetto
COPY src ./src

# Build dell'applicazione
RUN mvn -B clean package -DskipTests


# ===============================
# STAGE 2: runtime
# ===============================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copia il jar generato
COPY --from=build /app/target/*.jar app.jar

# Espone la porta standard Spring Boot
EXPOSE 8080

# Avvio dell'app
ENTRYPOINT ["java", "-jar", "app.jar"]
