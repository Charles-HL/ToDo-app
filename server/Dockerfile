#
# Build stage
#
FROM maven:latest AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/ clean package

#
# Package stage
#
FROM openjdk:19
COPY --from=build /home/app/target/todoapp-1.0.0-SNAPSHOT.jar app.jar
COPY config/users config/users
ENTRYPOINT ["java", "-jar","/app.jar"]