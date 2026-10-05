// Fixtures for `semgrep --test`. See hardcoded-cloud-secret.js for conventions.

function handler(req) {
  // ruleid: unguarded-authorization-header-split
  const a = req.headers['authorization'].split(' ')[1];
  // ruleid: unguarded-authorization-header-split
  const b = req.headers.authorization.split(' ')[1];
  // ruleid: unguarded-authorization-header-split
  const c = req.headers?.['authorization'].split(' ')[1];

  // ok: unguarded-authorization-header-split
  const d = req.headers['authorization']?.split(' ')?.[1];
  const header = req.headers['authorization'];
  // ok: unguarded-authorization-header-split
  const e = header ? header.split(' ')[1] : undefined;

  return [a, b, c, d, e];
}

function guardedIf(req) {
  if (req.headers['authorization']) {
    // ok: unguarded-authorization-header-split
    return req.headers['authorization'].split(' ')[1];
  }
}

function guardedExpressions(req) {
  // ok: unguarded-authorization-header-split
  const a = req.headers.authorization && req.headers.authorization.split(' ')[1];
  // ok: unguarded-authorization-header-split
  const b = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  return [a, b];
}

function earlyReturn(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send();
  }
  // ok: unguarded-authorization-header-split
  return req.headers.authorization.split(' ')[1];
}

function earlyThrow(req) {
  if (!req.headers['authorization']) {
    throw new Error('missing header');
  }
  // ok: unguarded-authorization-header-split
  return req.headers['authorization'].split(' ')[1];
}

function splitInCondition(req) {
  // ruleid: unguarded-authorization-header-split
  if (req.headers.authorization.split(' ')[0] === 'Bearer') {
    return true;
  }
  // ruleid: unguarded-authorization-header-split
  const ok = req.headers.authorization.split(' ')[0] === 'Bearer' && check();
  // ruleid: unguarded-authorization-header-split
  return req.headers.authorization.split(' ')[1] ? ok : null;
}

function splitInsideNegatedBranch(req) {
  if (!req.headers.authorization) {
    // ruleid: unguarded-authorization-header-split
    return req.headers.authorization.split(' ')[1];
  }
}

function negatedBranchWithoutExit(req) {
  if (!req.headers.authorization) {
    logger.warn('missing header');
  }
  // ruleid: unguarded-authorization-header-split
  return req.headers.authorization.split(' ')[1];
}

module.exports = { handler };
