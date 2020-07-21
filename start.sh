ls -d */ | xargs -I {} bash -c "cd '{}' && docker-compose up -d"
