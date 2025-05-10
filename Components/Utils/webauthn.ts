// File: utils/webauthn.ts
import * as cbor from 'cbor';

/**
 * Decode a PublicKeyCredential to the raw 65-byte uncompressed P-256 point.
 */
export function extractUncompressedP256(
  credential: PublicKeyCredential
): Uint8Array {
  const attestationBuffer = new Uint8Array(
    (credential.response as any).attestationObject
  );
  const attestationStruct: any = cbor.decodeFirstSync(attestationBuffer);
  const authData = new Uint8Array(attestationStruct.authData);
  const rpIdHashLen = 32;
  const flagsLen = 1;
  const signCountLen = 4;
  const aaguidLen = 16;
  const headerLen = rpIdHashLen + flagsLen + signCountLen + aaguidLen;
  const credIdLenOffset = headerLen;
  const credIdLen = (authData[credIdLenOffset] << 8) | authData[credIdLenOffset + 1];
  const coseStart = credIdLenOffset + 2 + credIdLen;
  const cosePubKey = authData.slice(coseStart);
  const coseStruct: Map<number, Buffer> = cbor.decodeFirstSync(cosePubKey);
  const x = coseStruct.get(-2)!; // 32 bytes
  const y = coseStruct.get(-3)!; // 32 bytes
  const uncompressed = new Uint8Array(65);
  uncompressed[0] = 0x04;
  uncompressed.set(x, 1);
  uncompressed.set(y, 33);
  return uncompressed;
}
