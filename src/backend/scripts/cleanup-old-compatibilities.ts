import mongoose from "mongoose";
import { CompatibilityModel } from "../models/compatibility-model";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/printridge";

async function cleanupOldCompatibilities() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Подключение к MongoDB установлено");

    // Удаляем все документы, которые имеют старые поля deviceType или deviceId
    const result = await CompatibilityModel.deleteMany({
      $or: [
        { deviceType: { $exists: true } },
        { deviceId: { $exists: true } }
      ]
    });

    console.log(`✅ Удалено ${result.deletedCount} старых связей с полями deviceType/deviceId`);

    // Удаляем документы, где есть exampleId, но нет ни одного из новых полей (printerId, laptopId, cartridgeId)
    // И это не связь картридж-принтер (где нет exampleId)
    const result2 = await CompatibilityModel.deleteMany({
      exampleId: { $exists: true, $ne: null },
      printerId: { $exists: false },
      laptopId: { $exists: false },
      cartridgeId: { $exists: false }
    });

    console.log(`✅ Удалено ${result2.deletedCount} некорректных связей примеров`);

    console.log("✅ Очистка завершена");
    console.log("\n⚠️  ВАЖНО: Теперь нужно удалить старые индексы!");
    console.log("   Запустите: npx ts-node src/backend/scripts/drop-old-indexes.ts");
    process.exit(0);
  } catch (error) {
    console.error("❌ Ошибка при очистке:", error);
    process.exit(1);
  }
}

cleanupOldCompatibilities();

