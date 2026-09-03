PRAGMA foreign_keys = ON;

CREATE TABLE request_log (
  request_id TEXT PRIMARY KEY,
  route TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('processing', 'succeeded', 'failed')),
  response_json TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX request_log_created_at_idx ON request_log(created_at);

CREATE TABLE rate_limits (
  key TEXT NOT NULL,
  bucket INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  expires_at INTEGER NOT NULL,
  PRIMARY KEY (key, bucket)
);

CREATE INDEX rate_limits_expires_at_idx ON rate_limits(expires_at);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  starts_at TEXT NOT NULL,
  capacity INTEGER CHECK (capacity IS NULL OR capacity > 0),
  guest_limit INTEGER NOT NULL DEFAULT 1 CHECK (guest_limit BETWEEN 1 AND 12),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

CREATE TABLE rsvps (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE REFERENCES request_log(request_id),
  event_id TEXT NOT NULL REFERENCES events(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  email_hash TEXT NOT NULL,
  guests INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 12),
  accessibility TEXT,
  locale TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX rsvps_event_id_idx ON rsvps(event_id);
CREATE INDEX rsvps_email_hash_idx ON rsvps(email_hash);
CREATE INDEX rsvps_created_at_idx ON rsvps(created_at);

CREATE TABLE subscription_confirmations (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE REFERENCES request_log(request_id),
  token_hash TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  topics_json TEXT NOT NULL,
  locale TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE INDEX subscription_confirmations_expires_at_idx ON subscription_confirmations(expires_at);

CREATE TABLE webhook_events (
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  received_at INTEGER NOT NULL,
  PRIMARY KEY (provider, event_id)
);

CREATE INDEX webhook_events_received_at_idx ON webhook_events(received_at);
