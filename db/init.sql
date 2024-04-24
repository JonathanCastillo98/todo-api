SELECT 'CREATE DATABASE tododb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tododb')\gexec