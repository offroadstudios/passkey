// utils/webauthn.ts
import * as cbor from 'cbor'

export function extractUncompressedP256(
  credential: PublicKeyCredential
): Uint8Array {
  const attestation = new Uint8Array(
    (credential.response as any).attestationObject
  )
  const { authData } = cbor.decodeFirstSync(attestation) as any
  const data = new Uint8Array(authData)
  const rpIdHashLen = 32,
    flagsLen = 1,
    signCountLen = 4,
    aaguidLen = 16
  const headerLen = rpIdHashLen + flagsLen + signCountLen + aaguidLen
  const credIdLen =
    (data[headerLen] << 8) | data[headerLen + 1]
  const coseStart = headerLen + 2 + credIdLen
  const coseBuf = data.slice(coseStart)
  const coseStruct: Map<number, Buffer> = cbor.decodeFirstSync(coseBuf)
  const x = coseStruct.get(-2)!   // 32 bytes
  const y = coseStruct.get(-3)!   // 32 bytes
  const out = new Uint8Array(65)
  out[0] = 0x04
  out.set(x, 1)
  out.set(y, 33)
  return out
}
