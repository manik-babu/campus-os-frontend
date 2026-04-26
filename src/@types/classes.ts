import { IMeta } from "./shared";

export interface IClassPostData {
    posts: IClassPost[];
    meta: IMeta;
}
export interface IPostCommentData {
    comments: IClassPost[];
    meta: IMeta;
}

export interface IClassPost {
    id: string;
    authorId: string;
    courseOfferingId: string;
    message: string | null;
    attachment: string | null;
    type: ClassPostType;
    parentId: string | null;
    assignmentDeadLine: string | null;
    createdAt: string;
    updatedAt: string;
    _count: Count;
    author: Author;
}

export interface Count {
    comments: number;
}

export interface Author {
    id: string;
    name: string;
    idNo: string;
    role: string;
    image: string;
}
export enum ClassPostType {
    ANNOUNCEMENT = "ANNOUNCEMENT",
    ASSIGNMENT = "ASSIGNMENT",
    MATERIAL = "MATERIAL",
    COMMENT = "COMMENT",
}
