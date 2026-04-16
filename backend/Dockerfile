FROM docker.io/library/maven:3.9.6-eclipse-temurin-21-alpine
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY . .
RUN mvn clean package -DskipTests -q
RUN cp /app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
