#!/bin/sh
set -e

# Iniciar MaxScale como usuÃƒÂ¡rio maxscale
exec su -s /bin/sh maxscale -c "exec maxscale"

