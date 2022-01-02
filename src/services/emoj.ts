import request from '@utils/request';
import {PageInfo, Response, ResponseList} from '@utils/types';

export interface Emoj {
  id?: number;
  name?: string;
  desc?: string;
  like?: number;
  visit?: number;
  url?: string;
  group_id?: number;
  group_name?: string;
  created_at?: string;
}

export enum GetEmojBodyType {
  hot = 'hot',
  new = 'new',
}

export interface GetEmojBody extends PageInfo {
  name?: string;
  group_id?: number;
  type: GetEmojBodyType;
}

export interface EmojGroup {
  id?: number;
  name?: string;
  desc?: string;
  created_at?: string;
  emoj_list?: Emoj[];
}

export function getEmojList(body: GetEmojBody): Promise<ResponseList<Emoj>> {
  return request.post('/emoj/list', body);
}

export function updateEmoj(body: Emoj): Promise<Response> {
  return request.post('/emoj/update', body);
}

export interface EmojDetail extends Emoj {
  isLike: boolean;
}

export function getEmojDetail(body: {
  id: number;
  user_id: number;
}): Promise<Response<{emoj_list: EmojDetail[]; emoj_group_info: EmojGroup}>> {
  return request.post('/emoj/detail', body);
}

export interface GetEmojListBody extends PageInfo {
  name?: string;
}

export function getEmojGroupList(
  body: GetEmojListBody,
): Promise<ResponseList<EmojGroup>> {
  return request.post('/emoj-group/list', body);
}

interface UpdateUserEmojRelation {
  like: number;
  user_id: number;
  emoj_id: number;
}

export function updateUserEmojRelation(body: UpdateUserEmojRelation) {
  return request.post('/emoj/update-user-emoj-relation', body);
}

export function updateEmojVisit(body: {id: number}) {
  return request.post('/emoj/update-emoj-visit', body);
}
