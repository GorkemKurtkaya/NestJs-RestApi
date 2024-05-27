import { Controller, Post, Query } from '@nestjs/common';
import { detectSafeSearch } from 'C:\\Users\\Görkem\\nodejsnnudedetect\\nudedeneme.js'; // Node.js dosyası
import { ImageAnnotatorClient } from '@google-cloud/vision'; // Google Cloud Vision API'yi 

@Controller('image-analysis')
export class ImageAnalysisController {
  @Post()
  async analyzeImage(@Query('imageUri') imageUri: string) {
    try {
      const client = new ImageAnnotatorClient();
      const safeSearchResult = await detectSafeSearch(imageUri);
      const racyLikelihood = safeSearchResult.racy;
  
      let message = 'Safe search analysis completed';
      let warning = "*******UYARI UYGUNSUZ İÇERİK*******"
      let onayligorsel = "GÖRSEL UYGUN";
  
      // Uygunsuz içerik varsa sadece uyarı mesajını döndür
      if (racyLikelihood === 'VERY_LIKELY' || racyLikelihood === 'LIKELY') {
        return warning;
      } 
      
      // Uygun içerik varsa uyarı mesajını ve resmin URL'sini döndür
      else {
        return {
          onayligorsel,
          message,
          resim: imageUri,
          racyRating: racyLikelihood
        };
      }
    } catch (error) {
      throw new Error(`Error analyzing image: ${error.message}`);
    }
  }
}
