# Rabbit MQ

RabbitMQ acts as a `post box`, a `post office` and a `letter carrier`.

Descripción de actores:
- **_Producing (P)_**	-> The script that sends messages (_producer_).
- **_Consuming (C)_**	-> The script that receives messages (_consumer_).
- **_Queue (Q)_** 		-> The queue acts like a post office, many _producers_ can send messages to the queue and many _consumers_ can try to consume those messages.

## Hello World

![Hello World tutorial architecture](/.documentation/1_hello_world.png "Hello World tutorial architecture")

Two small scripts are implemented. One of them represents a _producer_ that sends a single message and the other represents a _consumer_ that receives messages.

## Work Queues

![Work Queues tutorial architecture](/.documentation/2_work_queues.png "Work Queues tutorial architecture")

The main idea behind Work Queues (_Task Queues_) is to avoid doing a resource-intensive task immediately and having to wait for it to complete. Instead we schedule the task to be done later. We encapsulate a task as a message and send it to a queue. A worker process running in the background will pop the tasks and eventually execute the job. When you run many workers the tasks will be shared between them.

If there are many workers working together, the **Round-robin** method is applied to dispatch the tasks.

## Publish/Subscribe

![Publish/Subscribe tutorial architecture](/.documentation/3_publish_subscribe.png "Publish/Subscribe tutorial architecture")

The core idea in the messaging model in RabbitMQ is that the producer never sends any messages directly to a queue. Actually, quite often the producer doesn't even know if a message will be delivered to any queue at all.

Instead, the producer can only send messages to an exchange. An exchange is a very simple thing. On one side it receives messages from producers and the other side it pushes them to queues. The exchange must know exactly what to do with a message it receives.

Should it be appended to a particular queue? Should it be appended to many queues? Or should it get discarded. The rules for that are defined by the exchange type.

Exchange types:
- **Direct**

The routing in direct exchange is simple — a message goes to the queues whose binding key exactly matches the routing key of the message.

The direct exchange type is useful to distinguish messages published to the same exchange using a simple string identifier.

- **Topic**

The routing is done according to the routing pattern. Instead of using fixed routing key, it uses wildcards. Messages are routed to one or many queues based on a matching between a message routing key and pattern. The routing key must consist of list of words delimited by a period “.”.

- **Headers**

A headers exchange routes messages based on arguments containing headers and optional values. It uses the message header attributes for routing.

- **Fanout**

A fanout exchange copies and routes a received message to all queues that are bound to it regardless of routing keys or patterns. The keys provided will simply be ignored.

Fanout exchanges can be useful when the same message needs to be sent to one or more queues with consumers who may process the same message in different ways.

- **Default**

The default exchange is a pre-declared direct exchange that has no name. It is usually referred by an empty string. If you use default exchange your message is delivered to the queue with a name equal to the routing key of the message.

- **Dead Letter**

If there is no matching queue for the message, the message is dropped. RabbitMQ provides an AMQP extension known as the “Dead Letter Exchange”. This exchange which provides the functionality to capture messages that are not deliverable.