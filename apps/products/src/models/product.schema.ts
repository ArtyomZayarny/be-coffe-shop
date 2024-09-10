import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  userId: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
