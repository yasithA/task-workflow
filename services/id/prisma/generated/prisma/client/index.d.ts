
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model AuthContext
 * 
 */
export type AuthContext = {
  state: string
  challenge: string
  originUrl: string
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  email: string
  name: string
  profilePicture: string | null
}

/**
 * Model AccessToken
 * 
 */
export type AccessToken = {
  id: string
  userId: string
  idpRefreshToken: string | null
  idpAccessToken: string
  idpAccessTokenExpiresAt: Date
  iamToken: string
  iamTokenExpiresAt: Date
}

/**
 * Model SigningKey
 * 
 */
export type SigningKey = {
  id: string
  privateKey: string
  isRevoked: boolean
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AuthContexts
 * const authContexts = await prisma.authContext.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AuthContexts
   * const authContexts = await prisma.authContext.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.authContext`: Exposes CRUD operations for the **AuthContext** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthContexts
    * const authContexts = await prisma.authContext.findMany()
    * ```
    */
  get authContext(): Prisma.AuthContextDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.accessToken`: Exposes CRUD operations for the **AccessToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessTokens
    * const accessTokens = await prisma.accessToken.findMany()
    * ```
    */
  get accessToken(): Prisma.AccessTokenDelegate<GlobalReject>;

  /**
   * `prisma.signingKey`: Exposes CRUD operations for the **SigningKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SigningKeys
    * const signingKeys = await prisma.signingKey.findMany()
    * ```
    */
  get signingKey(): Prisma.SigningKeyDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.7.1
   * Query Engine version: 272861e07ab64f234d3ffc4094e32bd61775599c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    AuthContext: 'AuthContext',
    User: 'User',
    AccessToken: 'AccessToken',
    SigningKey: 'SigningKey'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    AccessToken: number
  }

  export type UserCountOutputTypeSelect = {
    AccessToken?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model AuthContext
   */


  export type AggregateAuthContext = {
    _count: AuthContextCountAggregateOutputType | null
    _min: AuthContextMinAggregateOutputType | null
    _max: AuthContextMaxAggregateOutputType | null
  }

  export type AuthContextMinAggregateOutputType = {
    state: string | null
    challenge: string | null
    originUrl: string | null
  }

  export type AuthContextMaxAggregateOutputType = {
    state: string | null
    challenge: string | null
    originUrl: string | null
  }

  export type AuthContextCountAggregateOutputType = {
    state: number
    challenge: number
    originUrl: number
    _all: number
  }


  export type AuthContextMinAggregateInputType = {
    state?: true
    challenge?: true
    originUrl?: true
  }

  export type AuthContextMaxAggregateInputType = {
    state?: true
    challenge?: true
    originUrl?: true
  }

  export type AuthContextCountAggregateInputType = {
    state?: true
    challenge?: true
    originUrl?: true
    _all?: true
  }

  export type AuthContextAggregateArgs = {
    /**
     * Filter which AuthContext to aggregate.
     * 
    **/
    where?: AuthContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthContexts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthContextOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthContexts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthContexts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthContexts
    **/
    _count?: true | AuthContextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthContextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthContextMaxAggregateInputType
  }

  export type GetAuthContextAggregateType<T extends AuthContextAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthContext]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthContext[P]>
      : GetScalarType<T[P], AggregateAuthContext[P]>
  }




  export type AuthContextGroupByArgs = {
    where?: AuthContextWhereInput
    orderBy?: Enumerable<AuthContextOrderByWithAggregationInput>
    by: Array<AuthContextScalarFieldEnum>
    having?: AuthContextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthContextCountAggregateInputType | true
    _min?: AuthContextMinAggregateInputType
    _max?: AuthContextMaxAggregateInputType
  }


  export type AuthContextGroupByOutputType = {
    state: string
    challenge: string
    originUrl: string
    _count: AuthContextCountAggregateOutputType | null
    _min: AuthContextMinAggregateOutputType | null
    _max: AuthContextMaxAggregateOutputType | null
  }

  type GetAuthContextGroupByPayload<T extends AuthContextGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthContextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthContextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthContextGroupByOutputType[P]>
            : GetScalarType<T[P], AuthContextGroupByOutputType[P]>
        }
      >
    >


  export type AuthContextSelect = {
    state?: boolean
    challenge?: boolean
    originUrl?: boolean
  }


  export type AuthContextGetPayload<S extends boolean | null | undefined | AuthContextArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AuthContext :
    S extends undefined ? never :
    S extends { include: any } & (AuthContextArgs | AuthContextFindManyArgs)
    ? AuthContext 
    : S extends { select: any } & (AuthContextArgs | AuthContextFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AuthContext ? AuthContext[P] : never
  } 
      : AuthContext


  type AuthContextCountArgs = Merge<
    Omit<AuthContextFindManyArgs, 'select' | 'include'> & {
      select?: AuthContextCountAggregateInputType | true
    }
  >

  export interface AuthContextDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AuthContext that matches the filter.
     * @param {AuthContextFindUniqueArgs} args - Arguments to find a AuthContext
     * @example
     * // Get one AuthContext
     * const authContext = await prisma.authContext.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthContextFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthContextFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthContext'> extends True ? Prisma__AuthContextClient<AuthContextGetPayload<T>> : Prisma__AuthContextClient<AuthContextGetPayload<T> | null, null>

    /**
     * Find one AuthContext that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AuthContextFindUniqueOrThrowArgs} args - Arguments to find a AuthContext
     * @example
     * // Get one AuthContext
     * const authContext = await prisma.authContext.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthContextFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthContextFindUniqueOrThrowArgs>
    ): Prisma__AuthContextClient<AuthContextGetPayload<T>>

    /**
     * Find the first AuthContext that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextFindFirstArgs} args - Arguments to find a AuthContext
     * @example
     * // Get one AuthContext
     * const authContext = await prisma.authContext.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthContextFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthContextFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthContext'> extends True ? Prisma__AuthContextClient<AuthContextGetPayload<T>> : Prisma__AuthContextClient<AuthContextGetPayload<T> | null, null>

    /**
     * Find the first AuthContext that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextFindFirstOrThrowArgs} args - Arguments to find a AuthContext
     * @example
     * // Get one AuthContext
     * const authContext = await prisma.authContext.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthContextFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthContextFindFirstOrThrowArgs>
    ): Prisma__AuthContextClient<AuthContextGetPayload<T>>

    /**
     * Find zero or more AuthContexts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthContexts
     * const authContexts = await prisma.authContext.findMany()
     * 
     * // Get first 10 AuthContexts
     * const authContexts = await prisma.authContext.findMany({ take: 10 })
     * 
     * // Only select the `state`
     * const authContextWithStateOnly = await prisma.authContext.findMany({ select: { state: true } })
     * 
    **/
    findMany<T extends AuthContextFindManyArgs>(
      args?: SelectSubset<T, AuthContextFindManyArgs>
    ): PrismaPromise<Array<AuthContextGetPayload<T>>>

    /**
     * Create a AuthContext.
     * @param {AuthContextCreateArgs} args - Arguments to create a AuthContext.
     * @example
     * // Create one AuthContext
     * const AuthContext = await prisma.authContext.create({
     *   data: {
     *     // ... data to create a AuthContext
     *   }
     * })
     * 
    **/
    create<T extends AuthContextCreateArgs>(
      args: SelectSubset<T, AuthContextCreateArgs>
    ): Prisma__AuthContextClient<AuthContextGetPayload<T>>

    /**
     * Create many AuthContexts.
     *     @param {AuthContextCreateManyArgs} args - Arguments to create many AuthContexts.
     *     @example
     *     // Create many AuthContexts
     *     const authContext = await prisma.authContext.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuthContextCreateManyArgs>(
      args?: SelectSubset<T, AuthContextCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AuthContext.
     * @param {AuthContextDeleteArgs} args - Arguments to delete one AuthContext.
     * @example
     * // Delete one AuthContext
     * const AuthContext = await prisma.authContext.delete({
     *   where: {
     *     // ... filter to delete one AuthContext
     *   }
     * })
     * 
    **/
    delete<T extends AuthContextDeleteArgs>(
      args: SelectSubset<T, AuthContextDeleteArgs>
    ): Prisma__AuthContextClient<AuthContextGetPayload<T>>

    /**
     * Update one AuthContext.
     * @param {AuthContextUpdateArgs} args - Arguments to update one AuthContext.
     * @example
     * // Update one AuthContext
     * const authContext = await prisma.authContext.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthContextUpdateArgs>(
      args: SelectSubset<T, AuthContextUpdateArgs>
    ): Prisma__AuthContextClient<AuthContextGetPayload<T>>

    /**
     * Delete zero or more AuthContexts.
     * @param {AuthContextDeleteManyArgs} args - Arguments to filter AuthContexts to delete.
     * @example
     * // Delete a few AuthContexts
     * const { count } = await prisma.authContext.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthContextDeleteManyArgs>(
      args?: SelectSubset<T, AuthContextDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthContexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthContexts
     * const authContext = await prisma.authContext.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthContextUpdateManyArgs>(
      args: SelectSubset<T, AuthContextUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthContext.
     * @param {AuthContextUpsertArgs} args - Arguments to update or create a AuthContext.
     * @example
     * // Update or create a AuthContext
     * const authContext = await prisma.authContext.upsert({
     *   create: {
     *     // ... data to create a AuthContext
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthContext we want to update
     *   }
     * })
    **/
    upsert<T extends AuthContextUpsertArgs>(
      args: SelectSubset<T, AuthContextUpsertArgs>
    ): Prisma__AuthContextClient<AuthContextGetPayload<T>>

    /**
     * Count the number of AuthContexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextCountArgs} args - Arguments to filter AuthContexts to count.
     * @example
     * // Count the number of AuthContexts
     * const count = await prisma.authContext.count({
     *   where: {
     *     // ... the filter for the AuthContexts we want to count
     *   }
     * })
    **/
    count<T extends AuthContextCountArgs>(
      args?: Subset<T, AuthContextCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthContextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthContext.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthContextAggregateArgs>(args: Subset<T, AuthContextAggregateArgs>): PrismaPromise<GetAuthContextAggregateType<T>>

    /**
     * Group by AuthContext.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthContextGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthContextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthContextGroupByArgs['orderBy'] }
        : { orderBy?: AuthContextGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthContextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthContextGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthContext.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthContextClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AuthContext base type for findUnique actions
   */
  export type AuthContextFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * Filter, which AuthContext to fetch.
     * 
    **/
    where: AuthContextWhereUniqueInput
  }

  /**
   * AuthContext: findUnique
   */
  export interface AuthContextFindUniqueArgs extends AuthContextFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthContext findUniqueOrThrow
   */
  export type AuthContextFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * Filter, which AuthContext to fetch.
     * 
    **/
    where: AuthContextWhereUniqueInput
  }


  /**
   * AuthContext base type for findFirst actions
   */
  export type AuthContextFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * Filter, which AuthContext to fetch.
     * 
    **/
    where?: AuthContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthContexts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthContextOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthContexts.
     * 
    **/
    cursor?: AuthContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthContexts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthContexts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthContexts.
     * 
    **/
    distinct?: Enumerable<AuthContextScalarFieldEnum>
  }

  /**
   * AuthContext: findFirst
   */
  export interface AuthContextFindFirstArgs extends AuthContextFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthContext findFirstOrThrow
   */
  export type AuthContextFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * Filter, which AuthContext to fetch.
     * 
    **/
    where?: AuthContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthContexts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthContextOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthContexts.
     * 
    **/
    cursor?: AuthContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthContexts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthContexts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthContexts.
     * 
    **/
    distinct?: Enumerable<AuthContextScalarFieldEnum>
  }


  /**
   * AuthContext findMany
   */
  export type AuthContextFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * Filter, which AuthContexts to fetch.
     * 
    **/
    where?: AuthContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthContexts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthContextOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthContexts.
     * 
    **/
    cursor?: AuthContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthContexts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthContexts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthContextScalarFieldEnum>
  }


  /**
   * AuthContext create
   */
  export type AuthContextCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * The data needed to create a AuthContext.
     * 
    **/
    data: XOR<AuthContextCreateInput, AuthContextUncheckedCreateInput>
  }


  /**
   * AuthContext createMany
   */
  export type AuthContextCreateManyArgs = {
    /**
     * The data used to create many AuthContexts.
     * 
    **/
    data: Enumerable<AuthContextCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AuthContext update
   */
  export type AuthContextUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * The data needed to update a AuthContext.
     * 
    **/
    data: XOR<AuthContextUpdateInput, AuthContextUncheckedUpdateInput>
    /**
     * Choose, which AuthContext to update.
     * 
    **/
    where: AuthContextWhereUniqueInput
  }


  /**
   * AuthContext updateMany
   */
  export type AuthContextUpdateManyArgs = {
    /**
     * The data used to update AuthContexts.
     * 
    **/
    data: XOR<AuthContextUpdateManyMutationInput, AuthContextUncheckedUpdateManyInput>
    /**
     * Filter which AuthContexts to update
     * 
    **/
    where?: AuthContextWhereInput
  }


  /**
   * AuthContext upsert
   */
  export type AuthContextUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * The filter to search for the AuthContext to update in case it exists.
     * 
    **/
    where: AuthContextWhereUniqueInput
    /**
     * In case the AuthContext found by the `where` argument doesn't exist, create a new AuthContext with this data.
     * 
    **/
    create: XOR<AuthContextCreateInput, AuthContextUncheckedCreateInput>
    /**
     * In case the AuthContext was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthContextUpdateInput, AuthContextUncheckedUpdateInput>
  }


  /**
   * AuthContext delete
   */
  export type AuthContextDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
    /**
     * Filter which AuthContext to delete.
     * 
    **/
    where: AuthContextWhereUniqueInput
  }


  /**
   * AuthContext deleteMany
   */
  export type AuthContextDeleteManyArgs = {
    /**
     * Filter which AuthContexts to delete
     * 
    **/
    where?: AuthContextWhereInput
  }


  /**
   * AuthContext without action
   */
  export type AuthContextArgs = {
    /**
     * Select specific fields to fetch from the AuthContext
     * 
    **/
    select?: AuthContextSelect | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    profilePicture: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    profilePicture: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    profilePicture: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    profilePicture?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    profilePicture?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    profilePicture?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    profilePicture: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    name?: boolean
    profilePicture?: boolean
    AccessToken?: boolean | AccessTokenFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    AccessToken?: boolean | AccessTokenFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'AccessToken' ? Array < AccessTokenGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'AccessToken' ? Array < AccessTokenGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    AccessToken<T extends AccessTokenFindManyArgs= {}>(args?: Subset<T, AccessTokenFindManyArgs>): PrismaPromise<Array<AccessTokenGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model AccessToken
   */


  export type AggregateAccessToken = {
    _count: AccessTokenCountAggregateOutputType | null
    _min: AccessTokenMinAggregateOutputType | null
    _max: AccessTokenMaxAggregateOutputType | null
  }

  export type AccessTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    idpRefreshToken: string | null
    idpAccessToken: string | null
    idpAccessTokenExpiresAt: Date | null
    iamToken: string | null
    iamTokenExpiresAt: Date | null
  }

  export type AccessTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    idpRefreshToken: string | null
    idpAccessToken: string | null
    idpAccessTokenExpiresAt: Date | null
    iamToken: string | null
    iamTokenExpiresAt: Date | null
  }

  export type AccessTokenCountAggregateOutputType = {
    id: number
    userId: number
    idpRefreshToken: number
    idpAccessToken: number
    idpAccessTokenExpiresAt: number
    iamToken: number
    iamTokenExpiresAt: number
    _all: number
  }


  export type AccessTokenMinAggregateInputType = {
    id?: true
    userId?: true
    idpRefreshToken?: true
    idpAccessToken?: true
    idpAccessTokenExpiresAt?: true
    iamToken?: true
    iamTokenExpiresAt?: true
  }

  export type AccessTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    idpRefreshToken?: true
    idpAccessToken?: true
    idpAccessTokenExpiresAt?: true
    iamToken?: true
    iamTokenExpiresAt?: true
  }

  export type AccessTokenCountAggregateInputType = {
    id?: true
    userId?: true
    idpRefreshToken?: true
    idpAccessToken?: true
    idpAccessTokenExpiresAt?: true
    iamToken?: true
    iamTokenExpiresAt?: true
    _all?: true
  }

  export type AccessTokenAggregateArgs = {
    /**
     * Filter which AccessToken to aggregate.
     * 
    **/
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<AccessTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessTokens
    **/
    _count?: true | AccessTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessTokenMaxAggregateInputType
  }

  export type GetAccessTokenAggregateType<T extends AccessTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessToken[P]>
      : GetScalarType<T[P], AggregateAccessToken[P]>
  }




  export type AccessTokenGroupByArgs = {
    where?: AccessTokenWhereInput
    orderBy?: Enumerable<AccessTokenOrderByWithAggregationInput>
    by: Array<AccessTokenScalarFieldEnum>
    having?: AccessTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessTokenCountAggregateInputType | true
    _min?: AccessTokenMinAggregateInputType
    _max?: AccessTokenMaxAggregateInputType
  }


  export type AccessTokenGroupByOutputType = {
    id: string
    userId: string
    idpRefreshToken: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date
    iamToken: string
    iamTokenExpiresAt: Date
    _count: AccessTokenCountAggregateOutputType | null
    _min: AccessTokenMinAggregateOutputType | null
    _max: AccessTokenMaxAggregateOutputType | null
  }

  type GetAccessTokenGroupByPayload<T extends AccessTokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccessTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessTokenGroupByOutputType[P]>
            : GetScalarType<T[P], AccessTokenGroupByOutputType[P]>
        }
      >
    >


  export type AccessTokenSelect = {
    id?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    idpRefreshToken?: boolean
    idpAccessToken?: boolean
    idpAccessTokenExpiresAt?: boolean
    iamToken?: boolean
    iamTokenExpiresAt?: boolean
  }


  export type AccessTokenInclude = {
    user?: boolean | UserArgs
  } 

  export type AccessTokenGetPayload<S extends boolean | null | undefined | AccessTokenArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AccessToken :
    S extends undefined ? never :
    S extends { include: any } & (AccessTokenArgs | AccessTokenFindManyArgs)
    ? AccessToken  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (AccessTokenArgs | AccessTokenFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof AccessToken ? AccessToken[P] : never
  } 
      : AccessToken


  type AccessTokenCountArgs = Merge<
    Omit<AccessTokenFindManyArgs, 'select' | 'include'> & {
      select?: AccessTokenCountAggregateInputType | true
    }
  >

  export interface AccessTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AccessToken that matches the filter.
     * @param {AccessTokenFindUniqueArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccessTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccessTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AccessToken'> extends True ? Prisma__AccessTokenClient<AccessTokenGetPayload<T>> : Prisma__AccessTokenClient<AccessTokenGetPayload<T> | null, null>

    /**
     * Find one AccessToken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccessTokenFindUniqueOrThrowArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccessTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccessTokenFindUniqueOrThrowArgs>
    ): Prisma__AccessTokenClient<AccessTokenGetPayload<T>>

    /**
     * Find the first AccessToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenFindFirstArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccessTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccessTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AccessToken'> extends True ? Prisma__AccessTokenClient<AccessTokenGetPayload<T>> : Prisma__AccessTokenClient<AccessTokenGetPayload<T> | null, null>

    /**
     * Find the first AccessToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenFindFirstOrThrowArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccessTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccessTokenFindFirstOrThrowArgs>
    ): Prisma__AccessTokenClient<AccessTokenGetPayload<T>>

    /**
     * Find zero or more AccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessTokens
     * const accessTokens = await prisma.accessToken.findMany()
     * 
     * // Get first 10 AccessTokens
     * const accessTokens = await prisma.accessToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessTokenWithIdOnly = await prisma.accessToken.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccessTokenFindManyArgs>(
      args?: SelectSubset<T, AccessTokenFindManyArgs>
    ): PrismaPromise<Array<AccessTokenGetPayload<T>>>

    /**
     * Create a AccessToken.
     * @param {AccessTokenCreateArgs} args - Arguments to create a AccessToken.
     * @example
     * // Create one AccessToken
     * const AccessToken = await prisma.accessToken.create({
     *   data: {
     *     // ... data to create a AccessToken
     *   }
     * })
     * 
    **/
    create<T extends AccessTokenCreateArgs>(
      args: SelectSubset<T, AccessTokenCreateArgs>
    ): Prisma__AccessTokenClient<AccessTokenGetPayload<T>>

    /**
     * Create many AccessTokens.
     *     @param {AccessTokenCreateManyArgs} args - Arguments to create many AccessTokens.
     *     @example
     *     // Create many AccessTokens
     *     const accessToken = await prisma.accessToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccessTokenCreateManyArgs>(
      args?: SelectSubset<T, AccessTokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AccessToken.
     * @param {AccessTokenDeleteArgs} args - Arguments to delete one AccessToken.
     * @example
     * // Delete one AccessToken
     * const AccessToken = await prisma.accessToken.delete({
     *   where: {
     *     // ... filter to delete one AccessToken
     *   }
     * })
     * 
    **/
    delete<T extends AccessTokenDeleteArgs>(
      args: SelectSubset<T, AccessTokenDeleteArgs>
    ): Prisma__AccessTokenClient<AccessTokenGetPayload<T>>

    /**
     * Update one AccessToken.
     * @param {AccessTokenUpdateArgs} args - Arguments to update one AccessToken.
     * @example
     * // Update one AccessToken
     * const accessToken = await prisma.accessToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccessTokenUpdateArgs>(
      args: SelectSubset<T, AccessTokenUpdateArgs>
    ): Prisma__AccessTokenClient<AccessTokenGetPayload<T>>

    /**
     * Delete zero or more AccessTokens.
     * @param {AccessTokenDeleteManyArgs} args - Arguments to filter AccessTokens to delete.
     * @example
     * // Delete a few AccessTokens
     * const { count } = await prisma.accessToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccessTokenDeleteManyArgs>(
      args?: SelectSubset<T, AccessTokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessTokens
     * const accessToken = await prisma.accessToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccessTokenUpdateManyArgs>(
      args: SelectSubset<T, AccessTokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AccessToken.
     * @param {AccessTokenUpsertArgs} args - Arguments to update or create a AccessToken.
     * @example
     * // Update or create a AccessToken
     * const accessToken = await prisma.accessToken.upsert({
     *   create: {
     *     // ... data to create a AccessToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessToken we want to update
     *   }
     * })
    **/
    upsert<T extends AccessTokenUpsertArgs>(
      args: SelectSubset<T, AccessTokenUpsertArgs>
    ): Prisma__AccessTokenClient<AccessTokenGetPayload<T>>

    /**
     * Count the number of AccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenCountArgs} args - Arguments to filter AccessTokens to count.
     * @example
     * // Count the number of AccessTokens
     * const count = await prisma.accessToken.count({
     *   where: {
     *     // ... the filter for the AccessTokens we want to count
     *   }
     * })
    **/
    count<T extends AccessTokenCountArgs>(
      args?: Subset<T, AccessTokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessTokenAggregateArgs>(args: Subset<T, AccessTokenAggregateArgs>): PrismaPromise<GetAccessTokenAggregateType<T>>

    /**
     * Group by AccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessTokenGroupByArgs['orderBy'] }
        : { orderBy?: AccessTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessTokenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccessTokenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AccessToken base type for findUnique actions
   */
  export type AccessTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * Filter, which AccessToken to fetch.
     * 
    **/
    where: AccessTokenWhereUniqueInput
  }

  /**
   * AccessToken: findUnique
   */
  export interface AccessTokenFindUniqueArgs extends AccessTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccessToken findUniqueOrThrow
   */
  export type AccessTokenFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * Filter, which AccessToken to fetch.
     * 
    **/
    where: AccessTokenWhereUniqueInput
  }


  /**
   * AccessToken base type for findFirst actions
   */
  export type AccessTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * Filter, which AccessToken to fetch.
     * 
    **/
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<AccessTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessTokens.
     * 
    **/
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessTokens.
     * 
    **/
    distinct?: Enumerable<AccessTokenScalarFieldEnum>
  }

  /**
   * AccessToken: findFirst
   */
  export interface AccessTokenFindFirstArgs extends AccessTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccessToken findFirstOrThrow
   */
  export type AccessTokenFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * Filter, which AccessToken to fetch.
     * 
    **/
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<AccessTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessTokens.
     * 
    **/
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessTokens.
     * 
    **/
    distinct?: Enumerable<AccessTokenScalarFieldEnum>
  }


  /**
   * AccessToken findMany
   */
  export type AccessTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * Filter, which AccessTokens to fetch.
     * 
    **/
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<AccessTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessTokens.
     * 
    **/
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccessTokenScalarFieldEnum>
  }


  /**
   * AccessToken create
   */
  export type AccessTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * The data needed to create a AccessToken.
     * 
    **/
    data: XOR<AccessTokenCreateInput, AccessTokenUncheckedCreateInput>
  }


  /**
   * AccessToken createMany
   */
  export type AccessTokenCreateManyArgs = {
    /**
     * The data used to create many AccessTokens.
     * 
    **/
    data: Enumerable<AccessTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AccessToken update
   */
  export type AccessTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * The data needed to update a AccessToken.
     * 
    **/
    data: XOR<AccessTokenUpdateInput, AccessTokenUncheckedUpdateInput>
    /**
     * Choose, which AccessToken to update.
     * 
    **/
    where: AccessTokenWhereUniqueInput
  }


  /**
   * AccessToken updateMany
   */
  export type AccessTokenUpdateManyArgs = {
    /**
     * The data used to update AccessTokens.
     * 
    **/
    data: XOR<AccessTokenUpdateManyMutationInput, AccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which AccessTokens to update
     * 
    **/
    where?: AccessTokenWhereInput
  }


  /**
   * AccessToken upsert
   */
  export type AccessTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * The filter to search for the AccessToken to update in case it exists.
     * 
    **/
    where: AccessTokenWhereUniqueInput
    /**
     * In case the AccessToken found by the `where` argument doesn't exist, create a new AccessToken with this data.
     * 
    **/
    create: XOR<AccessTokenCreateInput, AccessTokenUncheckedCreateInput>
    /**
     * In case the AccessToken was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccessTokenUpdateInput, AccessTokenUncheckedUpdateInput>
  }


  /**
   * AccessToken delete
   */
  export type AccessTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
    /**
     * Filter which AccessToken to delete.
     * 
    **/
    where: AccessTokenWhereUniqueInput
  }


  /**
   * AccessToken deleteMany
   */
  export type AccessTokenDeleteManyArgs = {
    /**
     * Filter which AccessTokens to delete
     * 
    **/
    where?: AccessTokenWhereInput
  }


  /**
   * AccessToken without action
   */
  export type AccessTokenArgs = {
    /**
     * Select specific fields to fetch from the AccessToken
     * 
    **/
    select?: AccessTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccessTokenInclude | null
  }



  /**
   * Model SigningKey
   */


  export type AggregateSigningKey = {
    _count: SigningKeyCountAggregateOutputType | null
    _min: SigningKeyMinAggregateOutputType | null
    _max: SigningKeyMaxAggregateOutputType | null
  }

  export type SigningKeyMinAggregateOutputType = {
    id: string | null
    privateKey: string | null
    isRevoked: boolean | null
  }

  export type SigningKeyMaxAggregateOutputType = {
    id: string | null
    privateKey: string | null
    isRevoked: boolean | null
  }

  export type SigningKeyCountAggregateOutputType = {
    id: number
    privateKey: number
    isRevoked: number
    _all: number
  }


  export type SigningKeyMinAggregateInputType = {
    id?: true
    privateKey?: true
    isRevoked?: true
  }

  export type SigningKeyMaxAggregateInputType = {
    id?: true
    privateKey?: true
    isRevoked?: true
  }

  export type SigningKeyCountAggregateInputType = {
    id?: true
    privateKey?: true
    isRevoked?: true
    _all?: true
  }

  export type SigningKeyAggregateArgs = {
    /**
     * Filter which SigningKey to aggregate.
     * 
    **/
    where?: SigningKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigningKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<SigningKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SigningKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigningKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigningKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SigningKeys
    **/
    _count?: true | SigningKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SigningKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SigningKeyMaxAggregateInputType
  }

  export type GetSigningKeyAggregateType<T extends SigningKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateSigningKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSigningKey[P]>
      : GetScalarType<T[P], AggregateSigningKey[P]>
  }




  export type SigningKeyGroupByArgs = {
    where?: SigningKeyWhereInput
    orderBy?: Enumerable<SigningKeyOrderByWithAggregationInput>
    by: Array<SigningKeyScalarFieldEnum>
    having?: SigningKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SigningKeyCountAggregateInputType | true
    _min?: SigningKeyMinAggregateInputType
    _max?: SigningKeyMaxAggregateInputType
  }


  export type SigningKeyGroupByOutputType = {
    id: string
    privateKey: string
    isRevoked: boolean
    _count: SigningKeyCountAggregateOutputType | null
    _min: SigningKeyMinAggregateOutputType | null
    _max: SigningKeyMaxAggregateOutputType | null
  }

  type GetSigningKeyGroupByPayload<T extends SigningKeyGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SigningKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SigningKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SigningKeyGroupByOutputType[P]>
            : GetScalarType<T[P], SigningKeyGroupByOutputType[P]>
        }
      >
    >


  export type SigningKeySelect = {
    id?: boolean
    privateKey?: boolean
    isRevoked?: boolean
  }


  export type SigningKeyGetPayload<S extends boolean | null | undefined | SigningKeyArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? SigningKey :
    S extends undefined ? never :
    S extends { include: any } & (SigningKeyArgs | SigningKeyFindManyArgs)
    ? SigningKey 
    : S extends { select: any } & (SigningKeyArgs | SigningKeyFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof SigningKey ? SigningKey[P] : never
  } 
      : SigningKey


  type SigningKeyCountArgs = Merge<
    Omit<SigningKeyFindManyArgs, 'select' | 'include'> & {
      select?: SigningKeyCountAggregateInputType | true
    }
  >

  export interface SigningKeyDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one SigningKey that matches the filter.
     * @param {SigningKeyFindUniqueArgs} args - Arguments to find a SigningKey
     * @example
     * // Get one SigningKey
     * const signingKey = await prisma.signingKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SigningKeyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SigningKeyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'SigningKey'> extends True ? Prisma__SigningKeyClient<SigningKeyGetPayload<T>> : Prisma__SigningKeyClient<SigningKeyGetPayload<T> | null, null>

    /**
     * Find one SigningKey that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SigningKeyFindUniqueOrThrowArgs} args - Arguments to find a SigningKey
     * @example
     * // Get one SigningKey
     * const signingKey = await prisma.signingKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SigningKeyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SigningKeyFindUniqueOrThrowArgs>
    ): Prisma__SigningKeyClient<SigningKeyGetPayload<T>>

    /**
     * Find the first SigningKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyFindFirstArgs} args - Arguments to find a SigningKey
     * @example
     * // Get one SigningKey
     * const signingKey = await prisma.signingKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SigningKeyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SigningKeyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'SigningKey'> extends True ? Prisma__SigningKeyClient<SigningKeyGetPayload<T>> : Prisma__SigningKeyClient<SigningKeyGetPayload<T> | null, null>

    /**
     * Find the first SigningKey that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyFindFirstOrThrowArgs} args - Arguments to find a SigningKey
     * @example
     * // Get one SigningKey
     * const signingKey = await prisma.signingKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SigningKeyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SigningKeyFindFirstOrThrowArgs>
    ): Prisma__SigningKeyClient<SigningKeyGetPayload<T>>

    /**
     * Find zero or more SigningKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SigningKeys
     * const signingKeys = await prisma.signingKey.findMany()
     * 
     * // Get first 10 SigningKeys
     * const signingKeys = await prisma.signingKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signingKeyWithIdOnly = await prisma.signingKey.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SigningKeyFindManyArgs>(
      args?: SelectSubset<T, SigningKeyFindManyArgs>
    ): PrismaPromise<Array<SigningKeyGetPayload<T>>>

    /**
     * Create a SigningKey.
     * @param {SigningKeyCreateArgs} args - Arguments to create a SigningKey.
     * @example
     * // Create one SigningKey
     * const SigningKey = await prisma.signingKey.create({
     *   data: {
     *     // ... data to create a SigningKey
     *   }
     * })
     * 
    **/
    create<T extends SigningKeyCreateArgs>(
      args: SelectSubset<T, SigningKeyCreateArgs>
    ): Prisma__SigningKeyClient<SigningKeyGetPayload<T>>

    /**
     * Create many SigningKeys.
     *     @param {SigningKeyCreateManyArgs} args - Arguments to create many SigningKeys.
     *     @example
     *     // Create many SigningKeys
     *     const signingKey = await prisma.signingKey.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SigningKeyCreateManyArgs>(
      args?: SelectSubset<T, SigningKeyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a SigningKey.
     * @param {SigningKeyDeleteArgs} args - Arguments to delete one SigningKey.
     * @example
     * // Delete one SigningKey
     * const SigningKey = await prisma.signingKey.delete({
     *   where: {
     *     // ... filter to delete one SigningKey
     *   }
     * })
     * 
    **/
    delete<T extends SigningKeyDeleteArgs>(
      args: SelectSubset<T, SigningKeyDeleteArgs>
    ): Prisma__SigningKeyClient<SigningKeyGetPayload<T>>

    /**
     * Update one SigningKey.
     * @param {SigningKeyUpdateArgs} args - Arguments to update one SigningKey.
     * @example
     * // Update one SigningKey
     * const signingKey = await prisma.signingKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SigningKeyUpdateArgs>(
      args: SelectSubset<T, SigningKeyUpdateArgs>
    ): Prisma__SigningKeyClient<SigningKeyGetPayload<T>>

    /**
     * Delete zero or more SigningKeys.
     * @param {SigningKeyDeleteManyArgs} args - Arguments to filter SigningKeys to delete.
     * @example
     * // Delete a few SigningKeys
     * const { count } = await prisma.signingKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SigningKeyDeleteManyArgs>(
      args?: SelectSubset<T, SigningKeyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more SigningKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SigningKeys
     * const signingKey = await prisma.signingKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SigningKeyUpdateManyArgs>(
      args: SelectSubset<T, SigningKeyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one SigningKey.
     * @param {SigningKeyUpsertArgs} args - Arguments to update or create a SigningKey.
     * @example
     * // Update or create a SigningKey
     * const signingKey = await prisma.signingKey.upsert({
     *   create: {
     *     // ... data to create a SigningKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SigningKey we want to update
     *   }
     * })
    **/
    upsert<T extends SigningKeyUpsertArgs>(
      args: SelectSubset<T, SigningKeyUpsertArgs>
    ): Prisma__SigningKeyClient<SigningKeyGetPayload<T>>

    /**
     * Count the number of SigningKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyCountArgs} args - Arguments to filter SigningKeys to count.
     * @example
     * // Count the number of SigningKeys
     * const count = await prisma.signingKey.count({
     *   where: {
     *     // ... the filter for the SigningKeys we want to count
     *   }
     * })
    **/
    count<T extends SigningKeyCountArgs>(
      args?: Subset<T, SigningKeyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SigningKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SigningKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SigningKeyAggregateArgs>(args: Subset<T, SigningKeyAggregateArgs>): PrismaPromise<GetSigningKeyAggregateType<T>>

    /**
     * Group by SigningKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigningKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SigningKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SigningKeyGroupByArgs['orderBy'] }
        : { orderBy?: SigningKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SigningKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSigningKeyGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for SigningKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SigningKeyClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * SigningKey base type for findUnique actions
   */
  export type SigningKeyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * Filter, which SigningKey to fetch.
     * 
    **/
    where: SigningKeyWhereUniqueInput
  }

  /**
   * SigningKey: findUnique
   */
  export interface SigningKeyFindUniqueArgs extends SigningKeyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SigningKey findUniqueOrThrow
   */
  export type SigningKeyFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * Filter, which SigningKey to fetch.
     * 
    **/
    where: SigningKeyWhereUniqueInput
  }


  /**
   * SigningKey base type for findFirst actions
   */
  export type SigningKeyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * Filter, which SigningKey to fetch.
     * 
    **/
    where?: SigningKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigningKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<SigningKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SigningKeys.
     * 
    **/
    cursor?: SigningKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigningKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigningKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SigningKeys.
     * 
    **/
    distinct?: Enumerable<SigningKeyScalarFieldEnum>
  }

  /**
   * SigningKey: findFirst
   */
  export interface SigningKeyFindFirstArgs extends SigningKeyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SigningKey findFirstOrThrow
   */
  export type SigningKeyFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * Filter, which SigningKey to fetch.
     * 
    **/
    where?: SigningKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigningKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<SigningKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SigningKeys.
     * 
    **/
    cursor?: SigningKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigningKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigningKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SigningKeys.
     * 
    **/
    distinct?: Enumerable<SigningKeyScalarFieldEnum>
  }


  /**
   * SigningKey findMany
   */
  export type SigningKeyFindManyArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * Filter, which SigningKeys to fetch.
     * 
    **/
    where?: SigningKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigningKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<SigningKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SigningKeys.
     * 
    **/
    cursor?: SigningKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigningKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigningKeys.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SigningKeyScalarFieldEnum>
  }


  /**
   * SigningKey create
   */
  export type SigningKeyCreateArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * The data needed to create a SigningKey.
     * 
    **/
    data: XOR<SigningKeyCreateInput, SigningKeyUncheckedCreateInput>
  }


  /**
   * SigningKey createMany
   */
  export type SigningKeyCreateManyArgs = {
    /**
     * The data used to create many SigningKeys.
     * 
    **/
    data: Enumerable<SigningKeyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * SigningKey update
   */
  export type SigningKeyUpdateArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * The data needed to update a SigningKey.
     * 
    **/
    data: XOR<SigningKeyUpdateInput, SigningKeyUncheckedUpdateInput>
    /**
     * Choose, which SigningKey to update.
     * 
    **/
    where: SigningKeyWhereUniqueInput
  }


  /**
   * SigningKey updateMany
   */
  export type SigningKeyUpdateManyArgs = {
    /**
     * The data used to update SigningKeys.
     * 
    **/
    data: XOR<SigningKeyUpdateManyMutationInput, SigningKeyUncheckedUpdateManyInput>
    /**
     * Filter which SigningKeys to update
     * 
    **/
    where?: SigningKeyWhereInput
  }


  /**
   * SigningKey upsert
   */
  export type SigningKeyUpsertArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * The filter to search for the SigningKey to update in case it exists.
     * 
    **/
    where: SigningKeyWhereUniqueInput
    /**
     * In case the SigningKey found by the `where` argument doesn't exist, create a new SigningKey with this data.
     * 
    **/
    create: XOR<SigningKeyCreateInput, SigningKeyUncheckedCreateInput>
    /**
     * In case the SigningKey was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SigningKeyUpdateInput, SigningKeyUncheckedUpdateInput>
  }


  /**
   * SigningKey delete
   */
  export type SigningKeyDeleteArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
    /**
     * Filter which SigningKey to delete.
     * 
    **/
    where: SigningKeyWhereUniqueInput
  }


  /**
   * SigningKey deleteMany
   */
  export type SigningKeyDeleteManyArgs = {
    /**
     * Filter which SigningKeys to delete
     * 
    **/
    where?: SigningKeyWhereInput
  }


  /**
   * SigningKey without action
   */
  export type SigningKeyArgs = {
    /**
     * Select specific fields to fetch from the SigningKey
     * 
    **/
    select?: SigningKeySelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccessTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    idpRefreshToken: 'idpRefreshToken',
    idpAccessToken: 'idpAccessToken',
    idpAccessTokenExpiresAt: 'idpAccessTokenExpiresAt',
    iamToken: 'iamToken',
    iamTokenExpiresAt: 'iamTokenExpiresAt'
  };

  export type AccessTokenScalarFieldEnum = (typeof AccessTokenScalarFieldEnum)[keyof typeof AccessTokenScalarFieldEnum]


  export const AuthContextScalarFieldEnum: {
    state: 'state',
    challenge: 'challenge',
    originUrl: 'originUrl'
  };

  export type AuthContextScalarFieldEnum = (typeof AuthContextScalarFieldEnum)[keyof typeof AuthContextScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SigningKeyScalarFieldEnum: {
    id: 'id',
    privateKey: 'privateKey',
    isRevoked: 'isRevoked'
  };

  export type SigningKeyScalarFieldEnum = (typeof SigningKeyScalarFieldEnum)[keyof typeof SigningKeyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    profilePicture: 'profilePicture'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type AuthContextWhereInput = {
    AND?: Enumerable<AuthContextWhereInput>
    OR?: Enumerable<AuthContextWhereInput>
    NOT?: Enumerable<AuthContextWhereInput>
    state?: StringFilter | string
    challenge?: StringFilter | string
    originUrl?: StringFilter | string
  }

  export type AuthContextOrderByWithRelationInput = {
    state?: SortOrder
    challenge?: SortOrder
    originUrl?: SortOrder
  }

  export type AuthContextWhereUniqueInput = {
    state?: string
  }

  export type AuthContextOrderByWithAggregationInput = {
    state?: SortOrder
    challenge?: SortOrder
    originUrl?: SortOrder
    _count?: AuthContextCountOrderByAggregateInput
    _max?: AuthContextMaxOrderByAggregateInput
    _min?: AuthContextMinOrderByAggregateInput
  }

  export type AuthContextScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthContextScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthContextScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthContextScalarWhereWithAggregatesInput>
    state?: StringWithAggregatesFilter | string
    challenge?: StringWithAggregatesFilter | string
    originUrl?: StringWithAggregatesFilter | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringFilter | string
    profilePicture?: StringNullableFilter | string | null
    AccessToken?: AccessTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    AccessToken?: AccessTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    profilePicture?: StringNullableWithAggregatesFilter | string | null
  }

  export type AccessTokenWhereInput = {
    AND?: Enumerable<AccessTokenWhereInput>
    OR?: Enumerable<AccessTokenWhereInput>
    NOT?: Enumerable<AccessTokenWhereInput>
    id?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: StringFilter | string
    idpRefreshToken?: StringNullableFilter | string | null
    idpAccessToken?: StringFilter | string
    idpAccessTokenExpiresAt?: DateTimeFilter | Date | string
    iamToken?: StringFilter | string
    iamTokenExpiresAt?: DateTimeFilter | Date | string
  }

  export type AccessTokenOrderByWithRelationInput = {
    id?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    idpRefreshToken?: SortOrder
    idpAccessToken?: SortOrder
    idpAccessTokenExpiresAt?: SortOrder
    iamToken?: SortOrder
    iamTokenExpiresAt?: SortOrder
  }

  export type AccessTokenWhereUniqueInput = {
    id?: string
  }

  export type AccessTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    idpRefreshToken?: SortOrder
    idpAccessToken?: SortOrder
    idpAccessTokenExpiresAt?: SortOrder
    iamToken?: SortOrder
    iamTokenExpiresAt?: SortOrder
    _count?: AccessTokenCountOrderByAggregateInput
    _max?: AccessTokenMaxOrderByAggregateInput
    _min?: AccessTokenMinOrderByAggregateInput
  }

  export type AccessTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccessTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccessTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccessTokenScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    idpRefreshToken?: StringNullableWithAggregatesFilter | string | null
    idpAccessToken?: StringWithAggregatesFilter | string
    idpAccessTokenExpiresAt?: DateTimeWithAggregatesFilter | Date | string
    iamToken?: StringWithAggregatesFilter | string
    iamTokenExpiresAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type SigningKeyWhereInput = {
    AND?: Enumerable<SigningKeyWhereInput>
    OR?: Enumerable<SigningKeyWhereInput>
    NOT?: Enumerable<SigningKeyWhereInput>
    id?: StringFilter | string
    privateKey?: StringFilter | string
    isRevoked?: BoolFilter | boolean
  }

  export type SigningKeyOrderByWithRelationInput = {
    id?: SortOrder
    privateKey?: SortOrder
    isRevoked?: SortOrder
  }

  export type SigningKeyWhereUniqueInput = {
    id?: string
  }

  export type SigningKeyOrderByWithAggregationInput = {
    id?: SortOrder
    privateKey?: SortOrder
    isRevoked?: SortOrder
    _count?: SigningKeyCountOrderByAggregateInput
    _max?: SigningKeyMaxOrderByAggregateInput
    _min?: SigningKeyMinOrderByAggregateInput
  }

  export type SigningKeyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SigningKeyScalarWhereWithAggregatesInput>
    OR?: Enumerable<SigningKeyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SigningKeyScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    privateKey?: StringWithAggregatesFilter | string
    isRevoked?: BoolWithAggregatesFilter | boolean
  }

  export type AuthContextCreateInput = {
    state: string
    challenge: string
    originUrl: string
  }

  export type AuthContextUncheckedCreateInput = {
    state: string
    challenge: string
    originUrl: string
  }

  export type AuthContextUpdateInput = {
    state?: StringFieldUpdateOperationsInput | string
    challenge?: StringFieldUpdateOperationsInput | string
    originUrl?: StringFieldUpdateOperationsInput | string
  }

  export type AuthContextUncheckedUpdateInput = {
    state?: StringFieldUpdateOperationsInput | string
    challenge?: StringFieldUpdateOperationsInput | string
    originUrl?: StringFieldUpdateOperationsInput | string
  }

  export type AuthContextCreateManyInput = {
    state: string
    challenge: string
    originUrl: string
  }

  export type AuthContextUpdateManyMutationInput = {
    state?: StringFieldUpdateOperationsInput | string
    challenge?: StringFieldUpdateOperationsInput | string
    originUrl?: StringFieldUpdateOperationsInput | string
  }

  export type AuthContextUncheckedUpdateManyInput = {
    state?: StringFieldUpdateOperationsInput | string
    challenge?: StringFieldUpdateOperationsInput | string
    originUrl?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    profilePicture?: string | null
    AccessToken?: AccessTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    profilePicture?: string | null
    AccessToken?: AccessTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    AccessToken?: AccessTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    AccessToken?: AccessTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    profilePicture?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccessTokenCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutAccessTokenInput
    idpRefreshToken?: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date | string
    iamToken: string
    iamTokenExpiresAt: Date | string
  }

  export type AccessTokenUncheckedCreateInput = {
    id?: string
    userId: string
    idpRefreshToken?: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date | string
    iamToken: string
    iamTokenExpiresAt: Date | string
  }

  export type AccessTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAccessTokenNestedInput
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenCreateManyInput = {
    id?: string
    userId: string
    idpRefreshToken?: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date | string
    iamToken: string
    iamTokenExpiresAt: Date | string
  }

  export type AccessTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigningKeyCreateInput = {
    id?: string
    privateKey: string
    isRevoked?: boolean
  }

  export type SigningKeyUncheckedCreateInput = {
    id?: string
    privateKey: string
    isRevoked?: boolean
  }

  export type SigningKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SigningKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SigningKeyCreateManyInput = {
    id?: string
    privateKey: string
    isRevoked?: boolean
  }

  export type SigningKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SigningKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type AuthContextCountOrderByAggregateInput = {
    state?: SortOrder
    challenge?: SortOrder
    originUrl?: SortOrder
  }

  export type AuthContextMaxOrderByAggregateInput = {
    state?: SortOrder
    challenge?: SortOrder
    originUrl?: SortOrder
  }

  export type AuthContextMinOrderByAggregateInput = {
    state?: SortOrder
    challenge?: SortOrder
    originUrl?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type AccessTokenListRelationFilter = {
    every?: AccessTokenWhereInput
    some?: AccessTokenWhereInput
    none?: AccessTokenWhereInput
  }

  export type AccessTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type AccessTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    idpRefreshToken?: SortOrder
    idpAccessToken?: SortOrder
    idpAccessTokenExpiresAt?: SortOrder
    iamToken?: SortOrder
    iamTokenExpiresAt?: SortOrder
  }

  export type AccessTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    idpRefreshToken?: SortOrder
    idpAccessToken?: SortOrder
    idpAccessTokenExpiresAt?: SortOrder
    iamToken?: SortOrder
    iamTokenExpiresAt?: SortOrder
  }

  export type AccessTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    idpRefreshToken?: SortOrder
    idpAccessToken?: SortOrder
    idpAccessTokenExpiresAt?: SortOrder
    iamToken?: SortOrder
    iamTokenExpiresAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type SigningKeyCountOrderByAggregateInput = {
    id?: SortOrder
    privateKey?: SortOrder
    isRevoked?: SortOrder
  }

  export type SigningKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    privateKey?: SortOrder
    isRevoked?: SortOrder
  }

  export type SigningKeyMinOrderByAggregateInput = {
    id?: SortOrder
    privateKey?: SortOrder
    isRevoked?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type AccessTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccessTokenCreateWithoutUserInput>, Enumerable<AccessTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccessTokenCreateOrConnectWithoutUserInput>
    createMany?: AccessTokenCreateManyUserInputEnvelope
    connect?: Enumerable<AccessTokenWhereUniqueInput>
  }

  export type AccessTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccessTokenCreateWithoutUserInput>, Enumerable<AccessTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccessTokenCreateOrConnectWithoutUserInput>
    createMany?: AccessTokenCreateManyUserInputEnvelope
    connect?: Enumerable<AccessTokenWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AccessTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccessTokenCreateWithoutUserInput>, Enumerable<AccessTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccessTokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccessTokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccessTokenCreateManyUserInputEnvelope
    set?: Enumerable<AccessTokenWhereUniqueInput>
    disconnect?: Enumerable<AccessTokenWhereUniqueInput>
    delete?: Enumerable<AccessTokenWhereUniqueInput>
    connect?: Enumerable<AccessTokenWhereUniqueInput>
    update?: Enumerable<AccessTokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccessTokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccessTokenScalarWhereInput>
  }

  export type AccessTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccessTokenCreateWithoutUserInput>, Enumerable<AccessTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccessTokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccessTokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccessTokenCreateManyUserInputEnvelope
    set?: Enumerable<AccessTokenWhereUniqueInput>
    disconnect?: Enumerable<AccessTokenWhereUniqueInput>
    delete?: Enumerable<AccessTokenWhereUniqueInput>
    connect?: Enumerable<AccessTokenWhereUniqueInput>
    update?: Enumerable<AccessTokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccessTokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccessTokenScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutAccessTokenInput = {
    create?: XOR<UserCreateWithoutAccessTokenInput, UserUncheckedCreateWithoutAccessTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccessTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccessTokenNestedInput = {
    create?: XOR<UserCreateWithoutAccessTokenInput, UserUncheckedCreateWithoutAccessTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccessTokenInput
    upsert?: UserUpsertWithoutAccessTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccessTokenInput, UserUncheckedUpdateWithoutAccessTokenInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type AccessTokenCreateWithoutUserInput = {
    id?: string
    idpRefreshToken?: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date | string
    iamToken: string
    iamTokenExpiresAt: Date | string
  }

  export type AccessTokenUncheckedCreateWithoutUserInput = {
    id?: string
    idpRefreshToken?: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date | string
    iamToken: string
    iamTokenExpiresAt: Date | string
  }

  export type AccessTokenCreateOrConnectWithoutUserInput = {
    where: AccessTokenWhereUniqueInput
    create: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput>
  }

  export type AccessTokenCreateManyUserInputEnvelope = {
    data: Enumerable<AccessTokenCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type AccessTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: AccessTokenWhereUniqueInput
    update: XOR<AccessTokenUpdateWithoutUserInput, AccessTokenUncheckedUpdateWithoutUserInput>
    create: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput>
  }

  export type AccessTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: AccessTokenWhereUniqueInput
    data: XOR<AccessTokenUpdateWithoutUserInput, AccessTokenUncheckedUpdateWithoutUserInput>
  }

  export type AccessTokenUpdateManyWithWhereWithoutUserInput = {
    where: AccessTokenScalarWhereInput
    data: XOR<AccessTokenUpdateManyMutationInput, AccessTokenUncheckedUpdateManyWithoutAccessTokenInput>
  }

  export type AccessTokenScalarWhereInput = {
    AND?: Enumerable<AccessTokenScalarWhereInput>
    OR?: Enumerable<AccessTokenScalarWhereInput>
    NOT?: Enumerable<AccessTokenScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    idpRefreshToken?: StringNullableFilter | string | null
    idpAccessToken?: StringFilter | string
    idpAccessTokenExpiresAt?: DateTimeFilter | Date | string
    iamToken?: StringFilter | string
    iamTokenExpiresAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutAccessTokenInput = {
    id?: string
    email: string
    name: string
    profilePicture?: string | null
  }

  export type UserUncheckedCreateWithoutAccessTokenInput = {
    id?: string
    email: string
    name: string
    profilePicture?: string | null
  }

  export type UserCreateOrConnectWithoutAccessTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccessTokenInput, UserUncheckedCreateWithoutAccessTokenInput>
  }

  export type UserUpsertWithoutAccessTokenInput = {
    update: XOR<UserUpdateWithoutAccessTokenInput, UserUncheckedUpdateWithoutAccessTokenInput>
    create: XOR<UserCreateWithoutAccessTokenInput, UserUncheckedCreateWithoutAccessTokenInput>
  }

  export type UserUpdateWithoutAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccessTokenCreateManyUserInput = {
    id?: string
    idpRefreshToken?: string | null
    idpAccessToken: string
    idpAccessTokenExpiresAt: Date | string
    iamToken: string
    iamTokenExpiresAt: Date | string
  }

  export type AccessTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateManyWithoutAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    idpRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idpAccessToken?: StringFieldUpdateOperationsInput | string
    idpAccessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    iamToken?: StringFieldUpdateOperationsInput | string
    iamTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}