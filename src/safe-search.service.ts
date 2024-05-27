import { Injectable } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';

@Injectable()
export class SafeSearchService {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new ImageAnnotatorClient();
  }

  async detectSafeSearch(imageUri: string) {
    try {
      const [result] = await this.client.safeSearchDetection(imageUri);
      const detections = result.safeSearchAnnotation;
      return {
        adult: detections.adult,
        spoof: detections.spoof,
        medical: detections.medical,
        violence: detections.violence,
        racy: detections.racy,
      };
    } catch (error) {
      throw new Error(`Error detecting safe search: ${error.message}`);
    }
  }
}