// Fixtures for `semgrep --test`. Each `ruleid:` line asserts the rule MUST match
// the next line; each `ok:` line asserts it must NOT. These are fake, non-live
// values and this directory is excluded from the real scan via --exclude=.semgrep.
// Keep each match on the same line as its annotation +1 (no Prettier line wrap).

// --- hardcoded-aws-access-key ---
// ruleid: hardcoded-aws-access-key
const awsKey = 'AKIAIOSFODNN7EXAMPLE';
// ok: hardcoded-aws-access-key
const notAwsKey = 'AKIA_too_short';

// --- hardcoded-jwt-token ---
// ruleid: hardcoded-jwt-token
const jwt = 'eyJhbGciOiJI.eyJzdWIxMjM0.c2lnbmF0dXJlMDAwMDA';
// ok: hardcoded-jwt-token
const notJwt = 'eyJonly.two';

// --- hardcoded-gitlab-token ---
// ruleid: hardcoded-gitlab-token
const pat = 'glpat-AbCdEfGhIjKlMnOpQrSt';
// ruleid: hardcoded-gitlab-token
const npmrcUnquoted = '//gitlab.example.com/:_authToken=AbCdEfGhIjKlMnOpQrSt';
// ruleid: hardcoded-gitlab-token
const npmrcQuoted = '_authToken="AbCdEfGhIjKlMnOpQrSt"';
// ok: hardcoded-gitlab-token
const npmrcPlaceholder = '//gitlab.example.com/:_authToken=${GITLAB_NPM_TOKEN}';

// --- hardcoded-github-token ---
// ruleid: hardcoded-github-token
const ghPat = 'ghp_AbCdEfGhIjKlMnOpQrStUvWxYz0123456789';
// prettier-ignore
// ruleid: hardcoded-github-token
const ghFineGrained = 'github_pat_AbCdEfGhIjKlMnOpQrStUv_WxYz0123456789AbCdEfGhIjKlMnOpQrStUvWxYz01';
// ok: hardcoded-github-token
const ghTooShort = 'ghp_tooshort';

// --- hardcoded-private-key ---
// ruleid: hardcoded-private-key
const pem = '-----BEGIN RSA PRIVATE KEY-----';
// ruleid: hardcoded-private-key
const pemPlain = '-----BEGIN PRIVATE KEY-----';
// ok: hardcoded-private-key
const pubKey = '-----BEGIN PUBLIC KEY-----';

// --- credentials-in-connection-url ---
// ruleid: credentials-in-connection-url
const prodPg = 'postgres://appuser:S3cretPass@db.prod.example.com:5432/mydb';
// ruleid: credentials-in-connection-url
const prodRedis = 'redis://cacheuser:Zq8vNwT2xLpK@redis.prod.example.com:5842';
// ruleid: credentials-in-connection-url
const prodAmqp = 'amqp://broker:s0mePassword@rabbit.prod.example.com:5672';
// ok: credentials-in-connection-url
const localPg = 'postgres://postgres:postgres@localhost:5432/mydb';
// ok: credentials-in-connection-url
const localRedis = 'redis://localhost:6379';
// ok: credentials-in-connection-url
const composePg = 'postgres://user:password@postgres:5432/app';

// --- hardcoded-google-oauth-token ---
// ruleid: hardcoded-google-oauth-token
const gToken = 'ya29.AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfGhIj';
// ok: hardcoded-google-oauth-token
const gTooShort = 'ya29.short';

// --- plaintext-secret-in-comment ---
// ruleid: plaintext-secret-in-comment
// for reference unhashed key : someKeyValue2022
// ruleid: plaintext-secret-in-comment
// mot de passe en clair : Sup3rSecret
// ok: plaintext-secret-in-comment
// for reference unhashed key : XXX
// ok: plaintext-secret-in-comment
// plaintext password: <YOUR_PASSWORD>
// ok: plaintext-secret-in-comment
// unhashed key handling lives in cryptHelper
// ok: plaintext-secret-in-comment
const typed = { cleartextPassword: string };
// ok: plaintext-secret-in-comment
const plainTextPassword = req.body.password;
