plugins {
    kotlin("jvm") version "2.0.21"
    kotlin("plugin.allopen") version "2.0.21"
    id("io.quarkus")
    id("com.github.johnrengelman.shadow") version "8.1.0"
}

repositories {
    mavenCentral()
    mavenLocal()
}

val quarkusPlatformGroupId: String by project
val quarkusPlatformArtifactId: String by project
val quarkusPlatformVersion: String by project

dependencies {

    implementation(enforcedPlatform("${quarkusPlatformGroupId}:${quarkusPlatformArtifactId}:${quarkusPlatformVersion}"))

    // Quarkus and Kotlin
    implementation("io.quarkus:quarkus-rest")
    implementation("io.quarkus:quarkus-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("io.quarkus:quarkus-arc")
    implementation("io.quarkus:quarkus-rest-jackson")

    // Database (Hibernate Reactive & PostgreSQL)
    implementation("io.quarkus:quarkus-hibernate-reactive-rest-data-panache")
    implementation("io.quarkus:quarkus-hibernate-reactive")
    implementation("io.quarkus:quarkus-hibernate-reactive-panache")
    implementation("io.quarkus:quarkus-reactive-pg-client")
    implementation("io.quarkus:quarkus-vertx")
    runtimeOnly("org.postgresql:postgresql")
    implementation("org.jboss.slf4j:slf4j-jboss-logmanager:2.0.1.Final")

    // Artemis (JMS)
    implementation("io.quarkiverse.artemis:quarkus-artemis-core:3.8.0")
    implementation("io.quarkus:quarkus-smallrye-openapi")
    implementation("io.quarkiverse.artemis:quarkus-artemis-jms:3.8.0")

    // Testing
    testImplementation("io.quarkus:quarkus-junit5")
    testImplementation("io.rest-assured:rest-assured")
    testImplementation("io.quarkus:quarkus-test-security") // For security testing
    testImplementation("org.mockito:mockito-core:5.7.0") // Mocking framework
    testImplementation("io.mockk:mockk:1.13.7") // Kotlin-friendly mocking
    testImplementation("org.assertj:assertj-core:3.24.2") // Fluent assertions
    testImplementation("org.testcontainers:testcontainers:1.19.3") // TestContainers
    testImplementation("org.testcontainers:postgresql:1.19.3") // PostgreSQL TestContainer

    implementation("org.apache.logging.log4j:log4j-core:2.20.0") // Update to a stable version
    implementation("org.apache.logging.log4j:log4j-api:2.20.0") // Update to a stable version
}

group = "org.example"
version = "1.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

tasks.withType<Test> {
    systemProperty("java.util.logging.manager", "org.jboss.logmanager.LogManager")
}

tasks.withType<Jar> {
    archiveFileName.set("reservation-service.jar")
    manifest {
        attributes["Main-Class"] = "org.example.Main"
    }
    archiveClassifier.set("")
}

allOpen {
    annotation("jakarta.ws.rs.Path")
    annotation("jakarta.enterprise.context.ApplicationScoped")
    annotation("jakarta.persistence.Entity")
    annotation("io.quarkus.test.junit.QuarkusTest")
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
        javaParameters = true
    }
}
