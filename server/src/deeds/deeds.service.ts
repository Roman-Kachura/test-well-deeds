import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deed, DeedDocument } from './schemas/deeds.schema';
import { DeedCreateDto } from './dto/deed-create.dto';
import { DeedUpdateDto } from './dto/deed-update.dto';
import { DeedRemoveDto } from './dto/deed-remove.dto';
import { DeedGetDto } from './dto/deed-get.dto';
import { DeedResolveDto } from './dto/deed-resolve.dto';

@Injectable()
export class DeedsService {
  constructor(@InjectModel(Deed.name) private deedModel: Model<DeedDocument>) {}

  async createDeed(data: DeedCreateDto) {
    const deed = new this.deedModel(data);
    const savedDeed = await deed.save();
    return this.getResolveDeed(savedDeed);
  }

  async getDeeds(data: DeedGetDto): Promise<DeedResolveDto[]> {
    const deeds = await this.deedModel.find(data).exec();
    return deeds.map((d) => this.getResolveDeed(d)).reverse();
  }

  async updateDeed(data: DeedUpdateDto): Promise<DeedResolveDto> {
    await this.deedModel.findOneAndUpdate(
      { _id: data.id, uid: data.uid },
      { text: data.text },
    );
    const updatedDeed = await this.deedModel.findOne({
      _id: data.id,
      uid: data.uid,
    });
    return this.getResolveDeed(updatedDeed);
  }

  async removeDeed(data: DeedRemoveDto): Promise<{}> {
    const deed = await this.deedModel.findOneAndDelete({
      _id: data.id,
      uid: data.uid,
    });
    if (deed) {
      return {};
    }
  }

  getResolveDeed(deed: Deed): DeedResolveDto {
    return { text: deed.text, id: deed._id, uid: deed.uid };
  }
}
