ls -d */ | xargs -I {} bash -c "cd '{}' && docker-compose down -d"
