FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /work/

COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY gradle.properties .

RUN chmod +x gradlew

RUN ./gradlew dependencies --no-daemon

COPY src/ src/

RUN ./gradlew build --no-daemon

FROM eclipse-temurin:17-jre-alpine

WORKDIR /work/
COPY --from=build /work/build/libs/reservation-service.jar app.jar

CMD ["java", "-jar", "app.jar"]
