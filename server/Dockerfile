FROM openjdk:19
MAINTAINER charleshl
COPY target/todoapp-0.0.1-SNAPSHOT.jar app.jar
COPY config/users config/users
ENTRYPOINT ["java", "-jar","/app.jar"]