const test = require('ava')
const Client = require('./')

const ACCESS_TOKEN = 'demo_oauth_token'

const createClient = accessToken => new Client(accessToken)

test('requires access token', t => {
  try {
    createClient()
  } catch (e) {
    t.is(e.message, 'You must pass an `accessToken`.')
  }
})

test('defaults address', t => {
  const client = createClient(ACCESS_TOKEN)
  t.is(client.address, 'https://api.23andme.com/3')
})

test('client.getAccount() requires account ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getAccount()
  } catch (e) {
    t.is(e.message, 'You must pass an `accountId`.')
  }
})

test('client.getProfiles() requires account ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getProfiles()
  } catch (e) {
    t.is(e.message, 'You must pass an `accountId`.')
  }
})

test('client.getProfile() requires profile ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getProfile()
  } catch (e) {
    t.is(e.message, 'You must pass a `profileId`.')
  }
})

test('client.getAccession() requires accession ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getAccession()
  } catch (e) {
    t.is(e.message, 'You must pass a `accessionId`.')
  }
})

test('client.getMarkers() requires accession ID or gene name', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getMarkers({})
  } catch (e) {
    t.is(e.message, 'You must pass an `accessionId` or a `geneName`.')
  }
})

test('client.getMarker() requires marker ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getMarker()
  } catch (e) {
    t.is(e.message, 'You must pass a `markerId`.')
  }
})

test('client.getProfileMarkers() requires accession ID or gene name', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getProfileMarkers({})
  } catch (e) {
    t.is(e.message, 'You must pass an `accessionId` or a `geneName`.')
  }
})

test('client.getProfileMarker() requires profile ID and marker ID', async t => {
  const client = createClient(ACCESS_TOKEN)

  try {
    await client.getProfileMarker()
  } catch (e) {
    t.is(e.message, 'You must pass a `profileId`.')
  }

  try {
    await client.getProfileMarker('foo')
  } catch (e) {
    t.is(e.message, 'You must pass a `markerId`.')
  }
})

test('client.getVariants() requires accession ID, gene name, or chromosome ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getVariants({})
  } catch (e) {
    t.is(e.message, 'You must pass an `accessionId`, a `geneName`, or a `chromosomeId`.')
  }
})

test('client.getProfileVariants() requires accession ID, gene name, or chromosome ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getProfileVariants({})
  } catch (e) {
    t.is(e.message, 'You must pass an `accessionId`, a `geneName`, or a `chromosomeId`.')
  }
})

test('client.getReport() requires report ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getReport()
  } catch (e) {
    t.is(e.message, 'You must pass a `reportId`.')
  }
})

test('client.getProfileReports() requires profile ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getProfileReport()
  } catch (e) {
    t.is(e.message, 'You must pass a `profileId`.')
  }
})

test('client.getProfileReport() requires profile ID and report ID', async t => {
  const client = createClient(ACCESS_TOKEN)

  try {
    await client.getProfileReport()
  } catch (e) {
    t.is(e.message, 'You must pass a `profileId`.')
  }

  try {
    await client.getProfileReport('foo')
  } catch (e) {
    t.is(e.message, 'You must pass a `reportId`.')
  }
})

test('client.getGeneticPhenotypeRangeInteractions() requires predictor ID', async t => {
  const client = createClient(ACCESS_TOKEN)
  try {
    await client.getGeneticPhenotypeRangeInteractions()
  } catch (e) {
    t.is(e.message, 'You must pass a `predictorId`.')
  }
})
