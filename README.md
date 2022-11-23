# Rabbit MQ

RabbitMQ acts as a `post box`, a `post office` and a `letter carrier`.

Descripción de actores:
- **_Producing (P)_**	-> The script that sends messages (_producer_).
- **_Consuming (C)_**	-> The script that receives messages (_consumer_).
- **_Queue (Q)_** 		-> The queue acts like a post office, many _producers_ can send messages to the queue and many _consumers_ can try to consume those messages.

## Hello World

![Hello World tutorial architecture](/images/1_hello_world.png "Hello World tutorial architecture")

Two small scripts are implemented. One of them represents a _producer_ that sends a single message and the other represents a _consumer_ that receives messages.

## Work Queues

![Work Queues tutorial architecture](/images/2_work_queues.png "Work Queues tutorial architecture")

The main idea behind Work Queues (_Task Queues_) is to avoid doing a resource-intensive task immediately and having to wait for it to complete. Instead we schedule the task to be done later. We encapsulate a task as a message and send it to a queue. A worker process running in the background will pop the tasks and eventually execute the job. When you run many workers the tasks will be shared between them.

If there are many workers working together, the **Round-robin** method is applied to dispatch the tasks.

## Publish/Subscribe

![Publish/Subscribe tutorial architecture](/images/3_publish_subscribe.png "Publish/Subscribe tutorial architecture")