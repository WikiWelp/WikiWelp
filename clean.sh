#!/bin/bash

podman rm --force project_frontend_1
podman volume rm --force project_mvn_deps project_node_deps
podman rm --force project_db_1
podman volume rm --force project_db_data
podman rm --force project_backend_1
