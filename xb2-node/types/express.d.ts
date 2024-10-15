import { TokenPayload } from '../src/auth/auth.user.interface'
import { GetPostsOptionsFilter, GetPostsOptionsPagination } from '../src/post/post.service';

declare global {
    namespace Express {
        export interface Request {
            user: TokenPayload; 
            fileMetaData: {width?: number; height?: number; metadata?: {}}; 
            sortBy: string; 
            mFilter: GetPostsOptionsFilter; 
            pagination: GetPostsOptionsPagination; 
        }
    }
}