import { storageConfig } from '@/storage/config/storage-config';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key || typeof key !== 'string') {
    return NextResponse.json({ error: 'Key est requis.' }, { status: 400 });
  }

  // Security check: only allow wav2lip keys
  if (!key.startsWith('wav2lip/')) {
    return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403 });
  }

  try {
    const s3Client = new S3Client({
      region: storageConfig.region || 'auto',
      endpoint: storageConfig.endpoint,
      credentials: {
        accessKeyId: storageConfig.accessKeyId,
        secretAccessKey: storageConfig.secretAccessKey,
      },
      forcePathStyle: storageConfig.forcePathStyle,
    });

    const command = new GetObjectCommand({
      Bucket: storageConfig.bucketName,
      Key: key,
    });

    const s3Response = await s3Client.send(command);

    if (!s3Response.Body) {
      return NextResponse.json(
        { error: 'Fichier introuvable.' },
        { status: 404 }
      );
    }

    const stream = s3Response.Body.transformToWebStream();
    const contentType = s3Response.ContentType || 'application/octet-stream';
    const contentLength = s3Response.ContentLength?.toString();

    const headers = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    });

    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Public file proxy error:', error);
    return NextResponse.json(
      { error: 'Échec de la récupération du fichier.' },
      { status: 500 }
    );
  }
}
