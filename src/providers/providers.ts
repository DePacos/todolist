import { ErrorProvider } from '@/providers/error';
import { AppRouterProvider } from '@/providers/route';
import { SkeletonProvider } from '@/providers/skeleton';
import { StoreProvider } from '@/providers/store';

export const providers = [ErrorProvider, StoreProvider, SkeletonProvider, AppRouterProvider];
