# Wikiwelp

The wiki that _moves on_ with time.

A simple, yet modern WikiMedia cleanroom implementation based on [**Spring Boot framework**](https://spring.io/projects/spring-boot).

## Team Members

- **Giovanni Ricca** - 250512
- **Romualdo Tomaselli** - 255343

## Project structure

- **backend**: The backend for the site written in [**Java**](https://www.java.com/en/) with [**Spring Boot framework**](https://spring.io/projects/spring-boot)
- **frontend**: The frontend for the site written in [**Angular**](https://angular.dev/)

## Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) **or** [Podman](https://podman.io/) & [Podman Compose](https://github.com/containers/podman-compose)

## Setup

To start the project, run the following command on the rootdir:

```bash
# with podman-compose
podman-compose up --build -d

# with docker-compose
docker-compose up --build -d
```

> [!NOTE]
> It will take a while to start up for the first time. Let `docker` run.

Then visit the page on [http://localhost:3000](http://localhost:3000)

The default admin credentials are: `admin@wikiwelp.org` / `admin`

There's an `example/dump.sql` file ready to use with a couple of pages and users:

<details>
<summary>Click to reveal</summary>

```bash
# with podman-compose
podman-compose exec -T db psql -U wikiwelp -d wikiwelp < example/dump.sql

# with docker-compose
docker-compose exec -T db psql -U wikiwelp -d wikiwelp < example/dump.sql
```

Database content:

| `Users`                       | `Password`           |
| ----------------------------- | -------------------- |
| `admin@wikiwelp.org`          | `admin`              |
| `giovanniricca@pm.me`         | `giovanni.ricca-9`   |
| `musk@x.com`                  | `tesla-are-cool.x`   |
| `donald.trump@whitehouse.org` | `make-america-great` |

| `Pages`            | `Tags`                            | `Revisions`                 |
| ------------------ | --------------------------------- | --------------------------- |
| `Linus Torvalds`   | `linux,human,lord`                | `1967` -> `1991`            |
| `Git`              | `tool,version_control,lord,linux` | _none_                      |
| `Richard Stallman` | `unix,opensource,human,lord`      | _none_                      |
| `Linux`            | `linux,unix,opensource,lord`      | `realizato` -> `realizzato` |

</details>

To stop the project, run the following command on the rootdir:

```bash
# with podman-compose
podman-compose down

# with docker-compose
podman-compose down
```
