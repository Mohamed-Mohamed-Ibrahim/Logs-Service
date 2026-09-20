Task:

Develop a scalable event-driven microservice using Node.js,Express and Kafka for real-time processing.
Requirements:

    Implement a Kafka producer and consumer to process user activity logs.

    Store processed logs in MongoDB with proper indexing.

    Deploy the service using Docker and Kubernetes (K8s) on (Google Cloud/AWS) free tier or any other server 

    Follow DDD (Domain-Driven Design) principles in structuring the service.

    Expose a REST API to fetch processed logs with pagination and filtering.

Deliverables:

    GitHub repo URL with well-structured code and a README containing setup instructions.Docker file.

    A recorded demo showcasing the microservice working end-to-end with clear voice in english(any record without voice will be ignored).

    Short write-up in the README explaining your architecture choices.

Submit your work via this form: https://forms.gle/eKstRqUP69NHnV4M8 

Deadline: Tuesday , 22h Sep, 9 PM

 Note: AI-generated code submissions will be detected and rejected

 ### Commands

 ```bash
 docker run -d \
  --name broker \
  -p 9092:9092 \
  apache/kafka:latest
 ```