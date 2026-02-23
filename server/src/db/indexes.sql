-- For recent feed by time
CREATE INDEX signals_created_at_idx ON signals (created_at DESC);

-- For user’s signals ordered by time
CREATE INDEX idx_signals_feed_order ON signals (created_at DESC, id DESC);

