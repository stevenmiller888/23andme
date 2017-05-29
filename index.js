'use strict'

const debug = require('debug')('23andme')
const fetch = require('node-fetch')
const assert = require('assert')
const qs = require('qs')

class Client {
  constructor (accessToken) {
    debug('Client(%s)', accessToken)
    assert(accessToken, 'You must pass an `accessToken`.')
    this.address = 'https://api.23andme.com/3'
    this.accessToken = accessToken
  }

  getAccounts () {
    debug('getAccounts()')
    return this.call('account')
  }

  getAccount (accountId) {
    debug('getAccount(%s)', accountId)
    assert(accountId, 'You must pass an `accountId`.')
    return this.call(`account/${accountId}`)
  }

  getProfiles (accountId) {
    debug('getProfiles(%s)', accountId)
    assert(accountId, 'You must pass an `accountId`.')
    const query = qs.stringify({ account_id: accountId })
    return this.call(`profile?${query}`)
  }

  getProfile (profileId) {
    debug('getProfile(%s)', profileId)
    assert(profileId, 'You must pass a `profileId`.')
    return this.call(`profile/${profileId}`)
  }

  getAccessions () {
    debug('getAccessions()')
    return this.call('accession')
  }

  getAccession (accessionId) {
    debug('getAccession(%s)', accessionId)
    assert(accessionId, 'You must pass a `accessionId`.')
    return this.call(`accession/${accessionId}`)
  }

  getMarkers ({ accessionId, geneName, start, end, offset, limit }) {
    debug('getMarkers(%s, %s)', accessionId, geneName)
    assert(
      accessionId || geneName,
      'You must pass an `accessionId` or a `geneName`.'
    )
    const query = qs.stringify({
      accession_id: accessionId,
      gene_name: geneName,
      offset,
      limit,
      start,
      end
    })
    return this.call(`marker?${query}`)
  }

  getMarker (markerId) {
    debug('getMarker(%s)', markerId)
    assert(markerId, 'You must pass a `markerId`.')
    return this.call(`marker/${markerId}`)
  }

  getProfileMarkers ({
    profileId,
    accessionId,
    geneName,
    start,
    end,
    offset,
    limit
  }) {
    debug('getProfileMarkers(%s, %s)', accessionId, geneName)
    assert(
      accessionId || geneName,
      'You must pass an `accessionId` or a `geneName`.'
    )
    const query = qs.stringify({
      accession_id: accessionId,
      gene_name: geneName,
      offset,
      limit,
      start,
      end
    })
    return this.call(`profile/${profileId}/marker?${query}`)
  }

  getProfileMarker (profileId, markerId) {
    debug('getProfileMarker(%s, %s)', profileId, markerId)
    assert(profileId, 'You must pass a `profileId`.')
    assert(markerId, 'You must pass a `markerId`.')
    return this.call(`profile/${profileId}/marker/${markerId}`)
  }

  getVariants ({
    accessionId,
    geneName,
    chromosomeId,
    platformLabel,
    start,
    end,
    offset,
    limit
  }) {
    debug('getVariants(%s, %s, %s)', accessionId, geneName, chromosomeId)
    assert(
      accessionId || geneName || chromosomeId,
      'You must pass an `accessionId`, a `geneName`, or a `chromosomeId`.'
    )
    const query = qs.stringify({
      platform_label: platformLabel,
      chromosome_id: chromosomeId,
      accession_id: accessionId,
      gene_name: geneName,
      offset,
      limit,
      start,
      end
    })
    return this.call(`variant?${query}`)
  }

  getProfileVariants ({
    profileId,
    accessionId,
    geneName,
    chromosomeId,
    platformLabel,
    start,
    end,
    offset,
    limit
  }) {
    debug('getProfileVariants(%s, %s, %s)', accessionId, geneName, chromosomeId)
    assert(
      accessionId || geneName || chromosomeId,
      'You must pass an `accessionId`, a `geneName`, or a `chromosomeId`.'
    )
    const query = qs.stringify({
      platform_label: platformLabel,
      chromosome_id: chromosomeId,
      accession_id: accessionId,
      gene_name: geneName,
      offset,
      limit,
      start,
      end
    })
    return this.call(`profile/${profileId}/variant?${query}`)
  }

  getReports () {
    debug('getReports()')
    return this.call('report')
  }

  getReport (reportId) {
    debug('getReport(%s)', reportId)
    assert(reportId, 'You must pass a `reportId`.')
    return this.call(`report/${reportId}`)
  }

  getProfileReports (profileId) {
    debug('getProfileReport(%s)', profileId)
    assert(profileId, 'You must pass a `profileId`.')
    return this.call(`profile/${profileId}/report`)
  }

  getProfileReport (profileId, reportId) {
    debug('getProfileReport(%s, %s)', profileId, reportId)
    assert(profileId, 'You must pass a `profileId`.')
    assert(reportId, 'You must pass a `reportId`.')
    return this.call(`profile/${profileId}/report/${reportId}`)
  }

  getGeneticPhenotypeRangeInteractions (predictorId) {
    debug('getGeneticPhenotypeRangeInteractions(%s)', predictorId)
    assert(predictorId, 'You must pass a `predictorId`.')
    const query = qs.stringify({ predictor_id: predictorId })
    return this.call(`genetic_phenotype_range_interaction?${query}`)
  }

  call (path) {
    return fetch(`${this.address}/${path}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }).then(res => {
      if (!res.ok) {
        const error = new Error(res.statusText)
        error.status = res.status
        throw error
      }
      return res.json()
    })
  }
}

module.exports = Client
