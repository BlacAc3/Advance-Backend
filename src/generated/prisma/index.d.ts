
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Marketer
 * 
 */
export type Marketer = $Result.DefaultSelection<Prisma.$MarketerPayload>
/**
 * Model Employer
 * 
 */
export type Employer = $Result.DefaultSelection<Prisma.$EmployerPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Advance
 * 
 */
export type Advance = $Result.DefaultSelection<Prisma.$AdvancePayload>
/**
 * Model LiquidityPool
 * 
 */
export type LiquidityPool = $Result.DefaultSelection<Prisma.$LiquidityPoolPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model DemoRequest
 * 
 */
export type DemoRequest = $Result.DefaultSelection<Prisma.$DemoRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EnumAdvancesStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PAID: 'PAID',
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED'
};

export type EnumAdvancesStatus = (typeof EnumAdvancesStatus)[keyof typeof EnumAdvancesStatus]


export const EnumDemoRequestsStatus: {
  PENDING: 'PENDING',
  CONTACTED: 'CONTACTED',
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type EnumDemoRequestsStatus = (typeof EnumDemoRequestsStatus)[keyof typeof EnumDemoRequestsStatus]


export const EnumEmployeesKycStage: {
  none: 'none',
  level_1: 'level_1',
  level_2: 'level_2',
  full: 'full'
};

export type EnumEmployeesKycStage = (typeof EnumEmployeesKycStage)[keyof typeof EnumEmployeesKycStage]


export const EnumEmployeesKycStatus: {
  pending: 'pending',
  submitted: 'submitted',
  in_review: 'in_review',
  approved: 'approved',
  rejected: 'rejected',
  needs_info: 'needs_info',
  expired: 'expired'
};

export type EnumEmployeesKycStatus = (typeof EnumEmployeesKycStatus)[keyof typeof EnumEmployeesKycStatus]


export const EnumInvitationsRole: {
  EMPLOYER: 'EMPLOYER',
  EMPLOYEE: 'EMPLOYEE'
};

export type EnumInvitationsRole = (typeof EnumInvitationsRole)[keyof typeof EnumInvitationsRole]


export const EnumInvitationsStatus: {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  expired: 'expired'
};

export type EnumInvitationsStatus = (typeof EnumInvitationsStatus)[keyof typeof EnumInvitationsStatus]


export const EnumLiquidityPoolTransactionType: {
  CONTRIBUTION: 'CONTRIBUTION',
  WITHDRAWAL: 'WITHDRAWAL',
  ADVANCE_FUNDING: 'ADVANCE_FUNDING',
  REPAYMENT: 'REPAYMENT'
};

export type EnumLiquidityPoolTransactionType = (typeof EnumLiquidityPoolTransactionType)[keyof typeof EnumLiquidityPoolTransactionType]


export const EnumUsersRole: {
  ADMIN: 'ADMIN',
  EMPLOYER: 'EMPLOYER',
  EMPLOYEE: 'EMPLOYEE',
  WEB3_USER: 'WEB3_USER',
  REGULAR_USER: 'REGULAR_USER',
  MARKETER: 'MARKETER'
};

export type EnumUsersRole = (typeof EnumUsersRole)[keyof typeof EnumUsersRole]

}

export type EnumAdvancesStatus = $Enums.EnumAdvancesStatus

export const EnumAdvancesStatus: typeof $Enums.EnumAdvancesStatus

export type EnumDemoRequestsStatus = $Enums.EnumDemoRequestsStatus

export const EnumDemoRequestsStatus: typeof $Enums.EnumDemoRequestsStatus

export type EnumEmployeesKycStage = $Enums.EnumEmployeesKycStage

export const EnumEmployeesKycStage: typeof $Enums.EnumEmployeesKycStage

export type EnumEmployeesKycStatus = $Enums.EnumEmployeesKycStatus

export const EnumEmployeesKycStatus: typeof $Enums.EnumEmployeesKycStatus

export type EnumInvitationsRole = $Enums.EnumInvitationsRole

export const EnumInvitationsRole: typeof $Enums.EnumInvitationsRole

export type EnumInvitationsStatus = $Enums.EnumInvitationsStatus

export const EnumInvitationsStatus: typeof $Enums.EnumInvitationsStatus

export type EnumLiquidityPoolTransactionType = $Enums.EnumLiquidityPoolTransactionType

export const EnumLiquidityPoolTransactionType: typeof $Enums.EnumLiquidityPoolTransactionType

export type EnumUsersRole = $Enums.EnumUsersRole

export const EnumUsersRole: typeof $Enums.EnumUsersRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketer`: Exposes CRUD operations for the **Marketer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Marketers
    * const marketers = await prisma.marketer.findMany()
    * ```
    */
  get marketer(): Prisma.MarketerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employer`: Exposes CRUD operations for the **Employer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employers
    * const employers = await prisma.employer.findMany()
    * ```
    */
  get employer(): Prisma.EmployerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.advance`: Exposes CRUD operations for the **Advance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Advances
    * const advances = await prisma.advance.findMany()
    * ```
    */
  get advance(): Prisma.AdvanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liquidityPool`: Exposes CRUD operations for the **LiquidityPool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiquidityPools
    * const liquidityPools = await prisma.liquidityPool.findMany()
    * ```
    */
  get liquidityPool(): Prisma.LiquidityPoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.demoRequest`: Exposes CRUD operations for the **DemoRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DemoRequests
    * const demoRequests = await prisma.demoRequest.findMany()
    * ```
    */
  get demoRequest(): Prisma.DemoRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Marketer: 'Marketer',
    Employer: 'Employer',
    Employee: 'Employee',
    Advance: 'Advance',
    LiquidityPool: 'LiquidityPool',
    Invitation: 'Invitation',
    DemoRequest: 'DemoRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "marketer" | "employer" | "employee" | "advance" | "liquidityPool" | "invitation" | "demoRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Marketer: {
        payload: Prisma.$MarketerPayload<ExtArgs>
        fields: Prisma.MarketerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>
          }
          findFirst: {
            args: Prisma.MarketerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>
          }
          findMany: {
            args: Prisma.MarketerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>[]
          }
          create: {
            args: Prisma.MarketerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>
          }
          createMany: {
            args: Prisma.MarketerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>[]
          }
          delete: {
            args: Prisma.MarketerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>
          }
          update: {
            args: Prisma.MarketerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>
          }
          deleteMany: {
            args: Prisma.MarketerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>[]
          }
          upsert: {
            args: Prisma.MarketerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketerPayload>
          }
          aggregate: {
            args: Prisma.MarketerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketer>
          }
          groupBy: {
            args: Prisma.MarketerGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketerGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketerCountArgs<ExtArgs>
            result: $Utils.Optional<MarketerCountAggregateOutputType> | number
          }
        }
      }
      Employer: {
        payload: Prisma.$EmployerPayload<ExtArgs>
        fields: Prisma.EmployerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          findFirst: {
            args: Prisma.EmployerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          findMany: {
            args: Prisma.EmployerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          create: {
            args: Prisma.EmployerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          createMany: {
            args: Prisma.EmployerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          delete: {
            args: Prisma.EmployerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          update: {
            args: Prisma.EmployerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          deleteMany: {
            args: Prisma.EmployerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          upsert: {
            args: Prisma.EmployerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          aggregate: {
            args: Prisma.EmployerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployer>
          }
          groupBy: {
            args: Prisma.EmployerGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployerGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployerCountArgs<ExtArgs>
            result: $Utils.Optional<EmployerCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Advance: {
        payload: Prisma.$AdvancePayload<ExtArgs>
        fields: Prisma.AdvanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdvanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdvanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>
          }
          findFirst: {
            args: Prisma.AdvanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdvanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>
          }
          findMany: {
            args: Prisma.AdvanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>[]
          }
          create: {
            args: Prisma.AdvanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>
          }
          createMany: {
            args: Prisma.AdvanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdvanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>[]
          }
          delete: {
            args: Prisma.AdvanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>
          }
          update: {
            args: Prisma.AdvanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>
          }
          deleteMany: {
            args: Prisma.AdvanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdvanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdvanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>[]
          }
          upsert: {
            args: Prisma.AdvanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvancePayload>
          }
          aggregate: {
            args: Prisma.AdvanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdvance>
          }
          groupBy: {
            args: Prisma.AdvanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdvanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdvanceCountArgs<ExtArgs>
            result: $Utils.Optional<AdvanceCountAggregateOutputType> | number
          }
        }
      }
      LiquidityPool: {
        payload: Prisma.$LiquidityPoolPayload<ExtArgs>
        fields: Prisma.LiquidityPoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiquidityPoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiquidityPoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>
          }
          findFirst: {
            args: Prisma.LiquidityPoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiquidityPoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>
          }
          findMany: {
            args: Prisma.LiquidityPoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>[]
          }
          create: {
            args: Prisma.LiquidityPoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>
          }
          createMany: {
            args: Prisma.LiquidityPoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiquidityPoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>[]
          }
          delete: {
            args: Prisma.LiquidityPoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>
          }
          update: {
            args: Prisma.LiquidityPoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>
          }
          deleteMany: {
            args: Prisma.LiquidityPoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiquidityPoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiquidityPoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>[]
          }
          upsert: {
            args: Prisma.LiquidityPoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidityPoolPayload>
          }
          aggregate: {
            args: Prisma.LiquidityPoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiquidityPool>
          }
          groupBy: {
            args: Prisma.LiquidityPoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiquidityPoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiquidityPoolCountArgs<ExtArgs>
            result: $Utils.Optional<LiquidityPoolCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      DemoRequest: {
        payload: Prisma.$DemoRequestPayload<ExtArgs>
        fields: Prisma.DemoRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DemoRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DemoRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>
          }
          findFirst: {
            args: Prisma.DemoRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DemoRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>
          }
          findMany: {
            args: Prisma.DemoRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>[]
          }
          create: {
            args: Prisma.DemoRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>
          }
          createMany: {
            args: Prisma.DemoRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DemoRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>[]
          }
          delete: {
            args: Prisma.DemoRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>
          }
          update: {
            args: Prisma.DemoRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>
          }
          deleteMany: {
            args: Prisma.DemoRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DemoRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DemoRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>[]
          }
          upsert: {
            args: Prisma.DemoRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoRequestPayload>
          }
          aggregate: {
            args: Prisma.DemoRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDemoRequest>
          }
          groupBy: {
            args: Prisma.DemoRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<DemoRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.DemoRequestCountArgs<ExtArgs>
            result: $Utils.Optional<DemoRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    marketer?: MarketerOmit
    employer?: EmployerOmit
    employee?: EmployeeOmit
    advance?: AdvanceOmit
    liquidityPool?: LiquidityPoolOmit
    invitation?: InvitationOmit
    demoRequest?: DemoRequestOmit
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
    verifiedEmployers: number
    kycReviewerEmployees: number
    sentInvitations: number
    receivedInvitations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verifiedEmployers?: boolean | UserCountOutputTypeCountVerifiedEmployersArgs
    kycReviewerEmployees?: boolean | UserCountOutputTypeCountKycReviewerEmployeesArgs
    sentInvitations?: boolean | UserCountOutputTypeCountSentInvitationsArgs
    receivedInvitations?: boolean | UserCountOutputTypeCountReceivedInvitationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerifiedEmployersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountKycReviewerEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }


  /**
   * Count Type MarketerCountOutputType
   */

  export type MarketerCountOutputType = {
    employers: number
  }

  export type MarketerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employers?: boolean | MarketerCountOutputTypeCountEmployersArgs
  }

  // Custom InputTypes
  /**
   * MarketerCountOutputType without action
   */
  export type MarketerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketerCountOutputType
     */
    select?: MarketerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MarketerCountOutputType without action
   */
  export type MarketerCountOutputTypeCountEmployersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerWhereInput
  }


  /**
   * Count Type EmployerCountOutputType
   */

  export type EmployerCountOutputType = {
    employees: number
    liquidityPools: number
  }

  export type EmployerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | EmployerCountOutputTypeCountEmployeesArgs
    liquidityPools?: boolean | EmployerCountOutputTypeCountLiquidityPoolsArgs
  }

  // Custom InputTypes
  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerCountOutputType
     */
    select?: EmployerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeCountLiquidityPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiquidityPoolWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    advances: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advances?: boolean | EmployeeCountOutputTypeCountAdvancesArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAdvancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdvanceWhereInput
  }


  /**
   * Models
   */

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
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.EnumUsersRole | null
    walletAddress: string | null
    isActive: boolean | null
    isWalletVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.EnumUsersRole | null
    walletAddress: string | null
    isActive: boolean | null
    isWalletVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    role: number
    walletAddress: number
    isActive: number
    isWalletVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    walletAddress?: true
    isActive?: true
    isWalletVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    walletAddress?: true
    isActive?: true
    isWalletVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    walletAddress?: true
    isActive?: true
    isWalletVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string | null
    email: string
    password: string
    role: $Enums.EnumUsersRole
    walletAddress: string | null
    isActive: boolean
    isWalletVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    marketer?: boolean | User$marketerArgs<ExtArgs>
    employer?: boolean | User$employerArgs<ExtArgs>
    employee?: boolean | User$employeeArgs<ExtArgs>
    verifiedEmployers?: boolean | User$verifiedEmployersArgs<ExtArgs>
    kycReviewerEmployees?: boolean | User$kycReviewerEmployeesArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "role" | "walletAddress" | "isActive" | "isWalletVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    marketer?: boolean | User$marketerArgs<ExtArgs>
    employer?: boolean | User$employerArgs<ExtArgs>
    employee?: boolean | User$employeeArgs<ExtArgs>
    verifiedEmployers?: boolean | User$verifiedEmployersArgs<ExtArgs>
    kycReviewerEmployees?: boolean | User$kycReviewerEmployeesArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      marketer: Prisma.$MarketerPayload<ExtArgs> | null
      employer: Prisma.$EmployerPayload<ExtArgs> | null
      employee: Prisma.$EmployeePayload<ExtArgs> | null
      verifiedEmployers: Prisma.$EmployerPayload<ExtArgs>[]
      kycReviewerEmployees: Prisma.$EmployeePayload<ExtArgs>[]
      sentInvitations: Prisma.$InvitationPayload<ExtArgs>[]
      receivedInvitations: Prisma.$InvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string | null
      email: string
      password: string
      role: $Enums.EnumUsersRole
      walletAddress: string | null
      isActive: boolean
      isWalletVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    marketer<T extends User$marketerArgs<ExtArgs> = {}>(args?: Subset<T, User$marketerArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employer<T extends User$employerArgs<ExtArgs> = {}>(args?: Subset<T, User$employerArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employee<T extends User$employeeArgs<ExtArgs> = {}>(args?: Subset<T, User$employeeArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verifiedEmployers<T extends User$verifiedEmployersArgs<ExtArgs> = {}>(args?: Subset<T, User$verifiedEmployersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    kycReviewerEmployees<T extends User$kycReviewerEmployeesArgs<ExtArgs> = {}>(args?: Subset<T, User$kycReviewerEmployeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentInvitations<T extends User$sentInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedInvitations<T extends User$receivedInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'EnumUsersRole'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isWalletVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.marketer
   */
  export type User$marketerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    where?: MarketerWhereInput
  }

  /**
   * User.employer
   */
  export type User$employerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    where?: EmployerWhereInput
  }

  /**
   * User.employee
   */
  export type User$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * User.verifiedEmployers
   */
  export type User$verifiedEmployersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    where?: EmployerWhereInput
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    cursor?: EmployerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * User.kycReviewerEmployees
   */
  export type User$kycReviewerEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * User.sentInvitations
   */
  export type User$sentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * User.receivedInvitations
   */
  export type User$receivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Marketer
   */

  export type AggregateMarketer = {
    _count: MarketerCountAggregateOutputType | null
    _avg: MarketerAvgAggregateOutputType | null
    _sum: MarketerSumAggregateOutputType | null
    _min: MarketerMinAggregateOutputType | null
    _max: MarketerMaxAggregateOutputType | null
  }

  export type MarketerAvgAggregateOutputType = {
    id: number | null
  }

  export type MarketerSumAggregateOutputType = {
    id: number | null
  }

  export type MarketerMinAggregateOutputType = {
    id: number | null
    userId: string | null
    registrationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketerMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    registrationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketerCountAggregateOutputType = {
    id: number
    userId: number
    registrationDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MarketerAvgAggregateInputType = {
    id?: true
  }

  export type MarketerSumAggregateInputType = {
    id?: true
  }

  export type MarketerMinAggregateInputType = {
    id?: true
    userId?: true
    registrationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketerMaxAggregateInputType = {
    id?: true
    userId?: true
    registrationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketerCountAggregateInputType = {
    id?: true
    userId?: true
    registrationDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MarketerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marketer to aggregate.
     */
    where?: MarketerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marketers to fetch.
     */
    orderBy?: MarketerOrderByWithRelationInput | MarketerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marketers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marketers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Marketers
    **/
    _count?: true | MarketerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketerMaxAggregateInputType
  }

  export type GetMarketerAggregateType<T extends MarketerAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketer[P]>
      : GetScalarType<T[P], AggregateMarketer[P]>
  }




  export type MarketerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketerWhereInput
    orderBy?: MarketerOrderByWithAggregationInput | MarketerOrderByWithAggregationInput[]
    by: MarketerScalarFieldEnum[] | MarketerScalarFieldEnum
    having?: MarketerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketerCountAggregateInputType | true
    _avg?: MarketerAvgAggregateInputType
    _sum?: MarketerSumAggregateInputType
    _min?: MarketerMinAggregateInputType
    _max?: MarketerMaxAggregateInputType
  }

  export type MarketerGroupByOutputType = {
    id: number
    userId: string
    registrationDate: Date
    createdAt: Date
    updatedAt: Date
    _count: MarketerCountAggregateOutputType | null
    _avg: MarketerAvgAggregateOutputType | null
    _sum: MarketerSumAggregateOutputType | null
    _min: MarketerMinAggregateOutputType | null
    _max: MarketerMaxAggregateOutputType | null
  }

  type GetMarketerGroupByPayload<T extends MarketerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketerGroupByOutputType[P]>
            : GetScalarType<T[P], MarketerGroupByOutputType[P]>
        }
      >
    >


  export type MarketerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    employers?: boolean | Marketer$employersArgs<ExtArgs>
    _count?: boolean | MarketerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketer"]>

  export type MarketerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketer"]>

  export type MarketerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketer"]>

  export type MarketerSelectScalar = {
    id?: boolean
    userId?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MarketerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "registrationDate" | "createdAt" | "updatedAt", ExtArgs["result"]["marketer"]>
  export type MarketerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    employers?: boolean | Marketer$employersArgs<ExtArgs>
    _count?: boolean | MarketerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MarketerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MarketerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MarketerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Marketer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      employers: Prisma.$EmployerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      registrationDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["marketer"]>
    composites: {}
  }

  type MarketerGetPayload<S extends boolean | null | undefined | MarketerDefaultArgs> = $Result.GetResult<Prisma.$MarketerPayload, S>

  type MarketerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketerCountAggregateInputType | true
    }

  export interface MarketerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Marketer'], meta: { name: 'Marketer' } }
    /**
     * Find zero or one Marketer that matches the filter.
     * @param {MarketerFindUniqueArgs} args - Arguments to find a Marketer
     * @example
     * // Get one Marketer
     * const marketer = await prisma.marketer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketerFindUniqueArgs>(args: SelectSubset<T, MarketerFindUniqueArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Marketer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketerFindUniqueOrThrowArgs} args - Arguments to find a Marketer
     * @example
     * // Get one Marketer
     * const marketer = await prisma.marketer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketerFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Marketer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerFindFirstArgs} args - Arguments to find a Marketer
     * @example
     * // Get one Marketer
     * const marketer = await prisma.marketer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketerFindFirstArgs>(args?: SelectSubset<T, MarketerFindFirstArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Marketer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerFindFirstOrThrowArgs} args - Arguments to find a Marketer
     * @example
     * // Get one Marketer
     * const marketer = await prisma.marketer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketerFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketerFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Marketers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Marketers
     * const marketers = await prisma.marketer.findMany()
     * 
     * // Get first 10 Marketers
     * const marketers = await prisma.marketer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketerWithIdOnly = await prisma.marketer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketerFindManyArgs>(args?: SelectSubset<T, MarketerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Marketer.
     * @param {MarketerCreateArgs} args - Arguments to create a Marketer.
     * @example
     * // Create one Marketer
     * const Marketer = await prisma.marketer.create({
     *   data: {
     *     // ... data to create a Marketer
     *   }
     * })
     * 
     */
    create<T extends MarketerCreateArgs>(args: SelectSubset<T, MarketerCreateArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Marketers.
     * @param {MarketerCreateManyArgs} args - Arguments to create many Marketers.
     * @example
     * // Create many Marketers
     * const marketer = await prisma.marketer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketerCreateManyArgs>(args?: SelectSubset<T, MarketerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Marketers and returns the data saved in the database.
     * @param {MarketerCreateManyAndReturnArgs} args - Arguments to create many Marketers.
     * @example
     * // Create many Marketers
     * const marketer = await prisma.marketer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Marketers and only return the `id`
     * const marketerWithIdOnly = await prisma.marketer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketerCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Marketer.
     * @param {MarketerDeleteArgs} args - Arguments to delete one Marketer.
     * @example
     * // Delete one Marketer
     * const Marketer = await prisma.marketer.delete({
     *   where: {
     *     // ... filter to delete one Marketer
     *   }
     * })
     * 
     */
    delete<T extends MarketerDeleteArgs>(args: SelectSubset<T, MarketerDeleteArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Marketer.
     * @param {MarketerUpdateArgs} args - Arguments to update one Marketer.
     * @example
     * // Update one Marketer
     * const marketer = await prisma.marketer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketerUpdateArgs>(args: SelectSubset<T, MarketerUpdateArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Marketers.
     * @param {MarketerDeleteManyArgs} args - Arguments to filter Marketers to delete.
     * @example
     * // Delete a few Marketers
     * const { count } = await prisma.marketer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketerDeleteManyArgs>(args?: SelectSubset<T, MarketerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marketers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Marketers
     * const marketer = await prisma.marketer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketerUpdateManyArgs>(args: SelectSubset<T, MarketerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marketers and returns the data updated in the database.
     * @param {MarketerUpdateManyAndReturnArgs} args - Arguments to update many Marketers.
     * @example
     * // Update many Marketers
     * const marketer = await prisma.marketer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Marketers and only return the `id`
     * const marketerWithIdOnly = await prisma.marketer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketerUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Marketer.
     * @param {MarketerUpsertArgs} args - Arguments to update or create a Marketer.
     * @example
     * // Update or create a Marketer
     * const marketer = await prisma.marketer.upsert({
     *   create: {
     *     // ... data to create a Marketer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Marketer we want to update
     *   }
     * })
     */
    upsert<T extends MarketerUpsertArgs>(args: SelectSubset<T, MarketerUpsertArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Marketers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerCountArgs} args - Arguments to filter Marketers to count.
     * @example
     * // Count the number of Marketers
     * const count = await prisma.marketer.count({
     *   where: {
     *     // ... the filter for the Marketers we want to count
     *   }
     * })
    **/
    count<T extends MarketerCountArgs>(
      args?: Subset<T, MarketerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Marketer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MarketerAggregateArgs>(args: Subset<T, MarketerAggregateArgs>): Prisma.PrismaPromise<GetMarketerAggregateType<T>>

    /**
     * Group by Marketer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketerGroupByArgs} args - Group by arguments.
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
      T extends MarketerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketerGroupByArgs['orderBy'] }
        : { orderBy?: MarketerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MarketerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Marketer model
   */
  readonly fields: MarketerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Marketer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employers<T extends Marketer$employersArgs<ExtArgs> = {}>(args?: Subset<T, Marketer$employersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Marketer model
   */
  interface MarketerFieldRefs {
    readonly id: FieldRef<"Marketer", 'Int'>
    readonly userId: FieldRef<"Marketer", 'String'>
    readonly registrationDate: FieldRef<"Marketer", 'DateTime'>
    readonly createdAt: FieldRef<"Marketer", 'DateTime'>
    readonly updatedAt: FieldRef<"Marketer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Marketer findUnique
   */
  export type MarketerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * Filter, which Marketer to fetch.
     */
    where: MarketerWhereUniqueInput
  }

  /**
   * Marketer findUniqueOrThrow
   */
  export type MarketerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * Filter, which Marketer to fetch.
     */
    where: MarketerWhereUniqueInput
  }

  /**
   * Marketer findFirst
   */
  export type MarketerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * Filter, which Marketer to fetch.
     */
    where?: MarketerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marketers to fetch.
     */
    orderBy?: MarketerOrderByWithRelationInput | MarketerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marketers.
     */
    cursor?: MarketerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marketers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marketers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marketers.
     */
    distinct?: MarketerScalarFieldEnum | MarketerScalarFieldEnum[]
  }

  /**
   * Marketer findFirstOrThrow
   */
  export type MarketerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * Filter, which Marketer to fetch.
     */
    where?: MarketerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marketers to fetch.
     */
    orderBy?: MarketerOrderByWithRelationInput | MarketerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marketers.
     */
    cursor?: MarketerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marketers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marketers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marketers.
     */
    distinct?: MarketerScalarFieldEnum | MarketerScalarFieldEnum[]
  }

  /**
   * Marketer findMany
   */
  export type MarketerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * Filter, which Marketers to fetch.
     */
    where?: MarketerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marketers to fetch.
     */
    orderBy?: MarketerOrderByWithRelationInput | MarketerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Marketers.
     */
    cursor?: MarketerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marketers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marketers.
     */
    skip?: number
    distinct?: MarketerScalarFieldEnum | MarketerScalarFieldEnum[]
  }

  /**
   * Marketer create
   */
  export type MarketerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * The data needed to create a Marketer.
     */
    data: XOR<MarketerCreateInput, MarketerUncheckedCreateInput>
  }

  /**
   * Marketer createMany
   */
  export type MarketerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Marketers.
     */
    data: MarketerCreateManyInput | MarketerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Marketer createManyAndReturn
   */
  export type MarketerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * The data used to create many Marketers.
     */
    data: MarketerCreateManyInput | MarketerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Marketer update
   */
  export type MarketerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * The data needed to update a Marketer.
     */
    data: XOR<MarketerUpdateInput, MarketerUncheckedUpdateInput>
    /**
     * Choose, which Marketer to update.
     */
    where: MarketerWhereUniqueInput
  }

  /**
   * Marketer updateMany
   */
  export type MarketerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Marketers.
     */
    data: XOR<MarketerUpdateManyMutationInput, MarketerUncheckedUpdateManyInput>
    /**
     * Filter which Marketers to update
     */
    where?: MarketerWhereInput
    /**
     * Limit how many Marketers to update.
     */
    limit?: number
  }

  /**
   * Marketer updateManyAndReturn
   */
  export type MarketerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * The data used to update Marketers.
     */
    data: XOR<MarketerUpdateManyMutationInput, MarketerUncheckedUpdateManyInput>
    /**
     * Filter which Marketers to update
     */
    where?: MarketerWhereInput
    /**
     * Limit how many Marketers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Marketer upsert
   */
  export type MarketerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * The filter to search for the Marketer to update in case it exists.
     */
    where: MarketerWhereUniqueInput
    /**
     * In case the Marketer found by the `where` argument doesn't exist, create a new Marketer with this data.
     */
    create: XOR<MarketerCreateInput, MarketerUncheckedCreateInput>
    /**
     * In case the Marketer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketerUpdateInput, MarketerUncheckedUpdateInput>
  }

  /**
   * Marketer delete
   */
  export type MarketerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    /**
     * Filter which Marketer to delete.
     */
    where: MarketerWhereUniqueInput
  }

  /**
   * Marketer deleteMany
   */
  export type MarketerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marketers to delete
     */
    where?: MarketerWhereInput
    /**
     * Limit how many Marketers to delete.
     */
    limit?: number
  }

  /**
   * Marketer.employers
   */
  export type Marketer$employersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    where?: EmployerWhereInput
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    cursor?: EmployerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Marketer without action
   */
  export type MarketerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
  }


  /**
   * Model Employer
   */

  export type AggregateEmployer = {
    _count: EmployerCountAggregateOutputType | null
    _avg: EmployerAvgAggregateOutputType | null
    _sum: EmployerSumAggregateOutputType | null
    _min: EmployerMinAggregateOutputType | null
    _max: EmployerMaxAggregateOutputType | null
  }

  export type EmployerAvgAggregateOutputType = {
    marketerId: number | null
  }

  export type EmployerSumAggregateOutputType = {
    marketerId: number | null
  }

  export type EmployerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    marketerId: number | null
    companyName: string | null
    registrationDate: Date | null
    isVerified: boolean | null
    verificationDate: Date | null
    verifiedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    marketerId: number | null
    companyName: string | null
    registrationDate: Date | null
    isVerified: boolean | null
    verificationDate: Date | null
    verifiedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployerCountAggregateOutputType = {
    id: number
    userId: number
    marketerId: number
    companyName: number
    registrationDate: number
    isVerified: number
    verificationDate: number
    verifiedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployerAvgAggregateInputType = {
    marketerId?: true
  }

  export type EmployerSumAggregateInputType = {
    marketerId?: true
  }

  export type EmployerMinAggregateInputType = {
    id?: true
    userId?: true
    marketerId?: true
    companyName?: true
    registrationDate?: true
    isVerified?: true
    verificationDate?: true
    verifiedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployerMaxAggregateInputType = {
    id?: true
    userId?: true
    marketerId?: true
    companyName?: true
    registrationDate?: true
    isVerified?: true
    verificationDate?: true
    verifiedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployerCountAggregateInputType = {
    id?: true
    userId?: true
    marketerId?: true
    companyName?: true
    registrationDate?: true
    isVerified?: true
    verificationDate?: true
    verifiedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employer to aggregate.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employers
    **/
    _count?: true | EmployerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployerMaxAggregateInputType
  }

  export type GetEmployerAggregateType<T extends EmployerAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployer[P]>
      : GetScalarType<T[P], AggregateEmployer[P]>
  }




  export type EmployerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerWhereInput
    orderBy?: EmployerOrderByWithAggregationInput | EmployerOrderByWithAggregationInput[]
    by: EmployerScalarFieldEnum[] | EmployerScalarFieldEnum
    having?: EmployerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployerCountAggregateInputType | true
    _avg?: EmployerAvgAggregateInputType
    _sum?: EmployerSumAggregateInputType
    _min?: EmployerMinAggregateInputType
    _max?: EmployerMaxAggregateInputType
  }

  export type EmployerGroupByOutputType = {
    id: string
    userId: string
    marketerId: number | null
    companyName: string
    registrationDate: Date
    isVerified: boolean
    verificationDate: Date | null
    verifiedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmployerCountAggregateOutputType | null
    _avg: EmployerAvgAggregateOutputType | null
    _sum: EmployerSumAggregateOutputType | null
    _min: EmployerMinAggregateOutputType | null
    _max: EmployerMaxAggregateOutputType | null
  }

  type GetEmployerGroupByPayload<T extends EmployerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployerGroupByOutputType[P]>
            : GetScalarType<T[P], EmployerGroupByOutputType[P]>
        }
      >
    >


  export type EmployerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketerId?: boolean
    companyName?: boolean
    registrationDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    marketer?: boolean | Employer$marketerArgs<ExtArgs>
    verifiedByUser?: boolean | Employer$verifiedByUserArgs<ExtArgs>
    employees?: boolean | Employer$employeesArgs<ExtArgs>
    liquidityPools?: boolean | Employer$liquidityPoolsArgs<ExtArgs>
    _count?: boolean | EmployerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>

  export type EmployerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketerId?: boolean
    companyName?: boolean
    registrationDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    marketer?: boolean | Employer$marketerArgs<ExtArgs>
    verifiedByUser?: boolean | Employer$verifiedByUserArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>

  export type EmployerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketerId?: boolean
    companyName?: boolean
    registrationDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    marketer?: boolean | Employer$marketerArgs<ExtArgs>
    verifiedByUser?: boolean | Employer$verifiedByUserArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>

  export type EmployerSelectScalar = {
    id?: boolean
    userId?: boolean
    marketerId?: boolean
    companyName?: boolean
    registrationDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "marketerId" | "companyName" | "registrationDate" | "isVerified" | "verificationDate" | "verifiedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["employer"]>
  export type EmployerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    marketer?: boolean | Employer$marketerArgs<ExtArgs>
    verifiedByUser?: boolean | Employer$verifiedByUserArgs<ExtArgs>
    employees?: boolean | Employer$employeesArgs<ExtArgs>
    liquidityPools?: boolean | Employer$liquidityPoolsArgs<ExtArgs>
    _count?: boolean | EmployerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    marketer?: boolean | Employer$marketerArgs<ExtArgs>
    verifiedByUser?: boolean | Employer$verifiedByUserArgs<ExtArgs>
  }
  export type EmployerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    marketer?: boolean | Employer$marketerArgs<ExtArgs>
    verifiedByUser?: boolean | Employer$verifiedByUserArgs<ExtArgs>
  }

  export type $EmployerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      marketer: Prisma.$MarketerPayload<ExtArgs> | null
      verifiedByUser: Prisma.$UserPayload<ExtArgs> | null
      employees: Prisma.$EmployeePayload<ExtArgs>[]
      liquidityPools: Prisma.$LiquidityPoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      marketerId: number | null
      companyName: string
      registrationDate: Date
      isVerified: boolean
      verificationDate: Date | null
      verifiedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employer"]>
    composites: {}
  }

  type EmployerGetPayload<S extends boolean | null | undefined | EmployerDefaultArgs> = $Result.GetResult<Prisma.$EmployerPayload, S>

  type EmployerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployerCountAggregateInputType | true
    }

  export interface EmployerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employer'], meta: { name: 'Employer' } }
    /**
     * Find zero or one Employer that matches the filter.
     * @param {EmployerFindUniqueArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployerFindUniqueArgs>(args: SelectSubset<T, EmployerFindUniqueArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployerFindUniqueOrThrowArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployerFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindFirstArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployerFindFirstArgs>(args?: SelectSubset<T, EmployerFindFirstArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindFirstOrThrowArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployerFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployerFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employers
     * const employers = await prisma.employer.findMany()
     * 
     * // Get first 10 Employers
     * const employers = await prisma.employer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employerWithIdOnly = await prisma.employer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployerFindManyArgs>(args?: SelectSubset<T, EmployerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employer.
     * @param {EmployerCreateArgs} args - Arguments to create a Employer.
     * @example
     * // Create one Employer
     * const Employer = await prisma.employer.create({
     *   data: {
     *     // ... data to create a Employer
     *   }
     * })
     * 
     */
    create<T extends EmployerCreateArgs>(args: SelectSubset<T, EmployerCreateArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employers.
     * @param {EmployerCreateManyArgs} args - Arguments to create many Employers.
     * @example
     * // Create many Employers
     * const employer = await prisma.employer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployerCreateManyArgs>(args?: SelectSubset<T, EmployerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employers and returns the data saved in the database.
     * @param {EmployerCreateManyAndReturnArgs} args - Arguments to create many Employers.
     * @example
     * // Create many Employers
     * const employer = await prisma.employer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employers and only return the `id`
     * const employerWithIdOnly = await prisma.employer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployerCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employer.
     * @param {EmployerDeleteArgs} args - Arguments to delete one Employer.
     * @example
     * // Delete one Employer
     * const Employer = await prisma.employer.delete({
     *   where: {
     *     // ... filter to delete one Employer
     *   }
     * })
     * 
     */
    delete<T extends EmployerDeleteArgs>(args: SelectSubset<T, EmployerDeleteArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employer.
     * @param {EmployerUpdateArgs} args - Arguments to update one Employer.
     * @example
     * // Update one Employer
     * const employer = await prisma.employer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployerUpdateArgs>(args: SelectSubset<T, EmployerUpdateArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employers.
     * @param {EmployerDeleteManyArgs} args - Arguments to filter Employers to delete.
     * @example
     * // Delete a few Employers
     * const { count } = await prisma.employer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployerDeleteManyArgs>(args?: SelectSubset<T, EmployerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employers
     * const employer = await prisma.employer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployerUpdateManyArgs>(args: SelectSubset<T, EmployerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employers and returns the data updated in the database.
     * @param {EmployerUpdateManyAndReturnArgs} args - Arguments to update many Employers.
     * @example
     * // Update many Employers
     * const employer = await prisma.employer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employers and only return the `id`
     * const employerWithIdOnly = await prisma.employer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployerUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employer.
     * @param {EmployerUpsertArgs} args - Arguments to update or create a Employer.
     * @example
     * // Update or create a Employer
     * const employer = await prisma.employer.upsert({
     *   create: {
     *     // ... data to create a Employer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employer we want to update
     *   }
     * })
     */
    upsert<T extends EmployerUpsertArgs>(args: SelectSubset<T, EmployerUpsertArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerCountArgs} args - Arguments to filter Employers to count.
     * @example
     * // Count the number of Employers
     * const count = await prisma.employer.count({
     *   where: {
     *     // ... the filter for the Employers we want to count
     *   }
     * })
    **/
    count<T extends EmployerCountArgs>(
      args?: Subset<T, EmployerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployerAggregateArgs>(args: Subset<T, EmployerAggregateArgs>): Prisma.PrismaPromise<GetEmployerAggregateType<T>>

    /**
     * Group by Employer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupByArgs} args - Group by arguments.
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
      T extends EmployerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployerGroupByArgs['orderBy'] }
        : { orderBy?: EmployerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, EmployerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employer model
   */
  readonly fields: EmployerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    marketer<T extends Employer$marketerArgs<ExtArgs> = {}>(args?: Subset<T, Employer$marketerArgs<ExtArgs>>): Prisma__MarketerClient<$Result.GetResult<Prisma.$MarketerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verifiedByUser<T extends Employer$verifiedByUserArgs<ExtArgs> = {}>(args?: Subset<T, Employer$verifiedByUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employees<T extends Employer$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Employer$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    liquidityPools<T extends Employer$liquidityPoolsArgs<ExtArgs> = {}>(args?: Subset<T, Employer$liquidityPoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employer model
   */
  interface EmployerFieldRefs {
    readonly id: FieldRef<"Employer", 'String'>
    readonly userId: FieldRef<"Employer", 'String'>
    readonly marketerId: FieldRef<"Employer", 'Int'>
    readonly companyName: FieldRef<"Employer", 'String'>
    readonly registrationDate: FieldRef<"Employer", 'DateTime'>
    readonly isVerified: FieldRef<"Employer", 'Boolean'>
    readonly verificationDate: FieldRef<"Employer", 'DateTime'>
    readonly verifiedBy: FieldRef<"Employer", 'String'>
    readonly createdAt: FieldRef<"Employer", 'DateTime'>
    readonly updatedAt: FieldRef<"Employer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employer findUnique
   */
  export type EmployerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer findUniqueOrThrow
   */
  export type EmployerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer findFirst
   */
  export type EmployerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer findFirstOrThrow
   */
  export type EmployerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer findMany
   */
  export type EmployerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employers to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer create
   */
  export type EmployerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The data needed to create a Employer.
     */
    data: XOR<EmployerCreateInput, EmployerUncheckedCreateInput>
  }

  /**
   * Employer createMany
   */
  export type EmployerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employers.
     */
    data: EmployerCreateManyInput | EmployerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employer createManyAndReturn
   */
  export type EmployerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * The data used to create many Employers.
     */
    data: EmployerCreateManyInput | EmployerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employer update
   */
  export type EmployerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The data needed to update a Employer.
     */
    data: XOR<EmployerUpdateInput, EmployerUncheckedUpdateInput>
    /**
     * Choose, which Employer to update.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer updateMany
   */
  export type EmployerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employers.
     */
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyInput>
    /**
     * Filter which Employers to update
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to update.
     */
    limit?: number
  }

  /**
   * Employer updateManyAndReturn
   */
  export type EmployerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * The data used to update Employers.
     */
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyInput>
    /**
     * Filter which Employers to update
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employer upsert
   */
  export type EmployerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The filter to search for the Employer to update in case it exists.
     */
    where: EmployerWhereUniqueInput
    /**
     * In case the Employer found by the `where` argument doesn't exist, create a new Employer with this data.
     */
    create: XOR<EmployerCreateInput, EmployerUncheckedCreateInput>
    /**
     * In case the Employer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployerUpdateInput, EmployerUncheckedUpdateInput>
  }

  /**
   * Employer delete
   */
  export type EmployerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter which Employer to delete.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer deleteMany
   */
  export type EmployerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employers to delete
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to delete.
     */
    limit?: number
  }

  /**
   * Employer.marketer
   */
  export type Employer$marketerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marketer
     */
    select?: MarketerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marketer
     */
    omit?: MarketerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketerInclude<ExtArgs> | null
    where?: MarketerWhereInput
  }

  /**
   * Employer.verifiedByUser
   */
  export type Employer$verifiedByUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Employer.employees
   */
  export type Employer$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employer.liquidityPools
   */
  export type Employer$liquidityPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    where?: LiquidityPoolWhereInput
    orderBy?: LiquidityPoolOrderByWithRelationInput | LiquidityPoolOrderByWithRelationInput[]
    cursor?: LiquidityPoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiquidityPoolScalarFieldEnum | LiquidityPoolScalarFieldEnum[]
  }

  /**
   * Employer without action
   */
  export type EmployerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    salary: Decimal | null
  }

  export type EmployeeSumAggregateOutputType = {
    salary: Decimal | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    employerId: string | null
    kycStage: $Enums.EnumEmployeesKycStage | null
    kycStatus: $Enums.EnumEmployeesKycStatus | null
    kycSubmittedAt: Date | null
    kycReviewedAt: Date | null
    kycReviewerId: string | null
    kycNotes: string | null
    salary: Decimal | null
    registrationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    employerId: string | null
    kycStage: $Enums.EnumEmployeesKycStage | null
    kycStatus: $Enums.EnumEmployeesKycStatus | null
    kycSubmittedAt: Date | null
    kycReviewedAt: Date | null
    kycReviewerId: string | null
    kycNotes: string | null
    salary: Decimal | null
    registrationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    userId: number
    employerId: number
    kycStage: number
    kycStatus: number
    kycSubmittedAt: number
    kycReviewedAt: number
    kycReviewerId: number
    kycNotes: number
    salary: number
    registrationDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    salary?: true
  }

  export type EmployeeSumAggregateInputType = {
    salary?: true
  }

  export type EmployeeMinAggregateInputType = {
    id?: true
    userId?: true
    employerId?: true
    kycStage?: true
    kycStatus?: true
    kycSubmittedAt?: true
    kycReviewedAt?: true
    kycReviewerId?: true
    kycNotes?: true
    salary?: true
    registrationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    userId?: true
    employerId?: true
    kycStage?: true
    kycStatus?: true
    kycSubmittedAt?: true
    kycReviewedAt?: true
    kycReviewerId?: true
    kycNotes?: true
    salary?: true
    registrationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    userId?: true
    employerId?: true
    kycStage?: true
    kycStatus?: true
    kycSubmittedAt?: true
    kycReviewedAt?: true
    kycReviewerId?: true
    kycNotes?: true
    salary?: true
    registrationDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    userId: string
    employerId: string
    kycStage: $Enums.EnumEmployeesKycStage
    kycStatus: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt: Date | null
    kycReviewedAt: Date | null
    kycReviewerId: string | null
    kycNotes: string | null
    salary: Decimal | null
    registrationDate: Date
    createdAt: Date
    updatedAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    employerId?: boolean
    kycStage?: boolean
    kycStatus?: boolean
    kycSubmittedAt?: boolean
    kycReviewedAt?: boolean
    kycReviewerId?: boolean
    kycNotes?: boolean
    salary?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    kycReviewer?: boolean | Employee$kycReviewerArgs<ExtArgs>
    advances?: boolean | Employee$advancesArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    employerId?: boolean
    kycStage?: boolean
    kycStatus?: boolean
    kycSubmittedAt?: boolean
    kycReviewedAt?: boolean
    kycReviewerId?: boolean
    kycNotes?: boolean
    salary?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    kycReviewer?: boolean | Employee$kycReviewerArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    employerId?: boolean
    kycStage?: boolean
    kycStatus?: boolean
    kycSubmittedAt?: boolean
    kycReviewedAt?: boolean
    kycReviewerId?: boolean
    kycNotes?: boolean
    salary?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    kycReviewer?: boolean | Employee$kycReviewerArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    userId?: boolean
    employerId?: boolean
    kycStage?: boolean
    kycStatus?: boolean
    kycSubmittedAt?: boolean
    kycReviewedAt?: boolean
    kycReviewerId?: boolean
    kycNotes?: boolean
    salary?: boolean
    registrationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "employerId" | "kycStage" | "kycStatus" | "kycSubmittedAt" | "kycReviewedAt" | "kycReviewerId" | "kycNotes" | "salary" | "registrationDate" | "createdAt" | "updatedAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    kycReviewer?: boolean | Employee$kycReviewerArgs<ExtArgs>
    advances?: boolean | Employee$advancesArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    kycReviewer?: boolean | Employee$kycReviewerArgs<ExtArgs>
  }
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    kycReviewer?: boolean | Employee$kycReviewerArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      employer: Prisma.$EmployerPayload<ExtArgs>
      kycReviewer: Prisma.$UserPayload<ExtArgs> | null
      advances: Prisma.$AdvancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      employerId: string
      kycStage: $Enums.EnumEmployeesKycStage
      kycStatus: $Enums.EnumEmployeesKycStatus
      kycSubmittedAt: Date | null
      kycReviewedAt: Date | null
      kycReviewerId: string | null
      kycNotes: string | null
      salary: Prisma.Decimal | null
      registrationDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
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
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employer<T extends EmployerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployerDefaultArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    kycReviewer<T extends Employee$kycReviewerArgs<ExtArgs> = {}>(args?: Subset<T, Employee$kycReviewerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    advances<T extends Employee$advancesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$advancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly userId: FieldRef<"Employee", 'String'>
    readonly employerId: FieldRef<"Employee", 'String'>
    readonly kycStage: FieldRef<"Employee", 'EnumEmployeesKycStage'>
    readonly kycStatus: FieldRef<"Employee", 'EnumEmployeesKycStatus'>
    readonly kycSubmittedAt: FieldRef<"Employee", 'DateTime'>
    readonly kycReviewedAt: FieldRef<"Employee", 'DateTime'>
    readonly kycReviewerId: FieldRef<"Employee", 'String'>
    readonly kycNotes: FieldRef<"Employee", 'String'>
    readonly salary: FieldRef<"Employee", 'Decimal'>
    readonly registrationDate: FieldRef<"Employee", 'DateTime'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.kycReviewer
   */
  export type Employee$kycReviewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Employee.advances
   */
  export type Employee$advancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    where?: AdvanceWhereInput
    orderBy?: AdvanceOrderByWithRelationInput | AdvanceOrderByWithRelationInput[]
    cursor?: AdvanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdvanceScalarFieldEnum | AdvanceScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Advance
   */

  export type AggregateAdvance = {
    _count: AdvanceCountAggregateOutputType | null
    _avg: AdvanceAvgAggregateOutputType | null
    _sum: AdvanceSumAggregateOutputType | null
    _min: AdvanceMinAggregateOutputType | null
    _max: AdvanceMaxAggregateOutputType | null
  }

  export type AdvanceAvgAggregateOutputType = {
    amount: Decimal | null
    repaymentAmount: Decimal | null
  }

  export type AdvanceSumAggregateOutputType = {
    amount: Decimal | null
    repaymentAmount: Decimal | null
  }

  export type AdvanceMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    amount: Decimal | null
    repaymentAmount: Decimal | null
    requestDate: Date | null
    approvalDate: Date | null
    paymentDate: Date | null
    dueDate: Date | null
    status: $Enums.EnumAdvancesStatus | null
    transactionHash: string | null
    repaymentTransactionHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdvanceMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    amount: Decimal | null
    repaymentAmount: Decimal | null
    requestDate: Date | null
    approvalDate: Date | null
    paymentDate: Date | null
    dueDate: Date | null
    status: $Enums.EnumAdvancesStatus | null
    transactionHash: string | null
    repaymentTransactionHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdvanceCountAggregateOutputType = {
    id: number
    employeeId: number
    amount: number
    repaymentAmount: number
    requestDate: number
    approvalDate: number
    paymentDate: number
    dueDate: number
    status: number
    transactionHash: number
    repaymentTransactionHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdvanceAvgAggregateInputType = {
    amount?: true
    repaymentAmount?: true
  }

  export type AdvanceSumAggregateInputType = {
    amount?: true
    repaymentAmount?: true
  }

  export type AdvanceMinAggregateInputType = {
    id?: true
    employeeId?: true
    amount?: true
    repaymentAmount?: true
    requestDate?: true
    approvalDate?: true
    paymentDate?: true
    dueDate?: true
    status?: true
    transactionHash?: true
    repaymentTransactionHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdvanceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    amount?: true
    repaymentAmount?: true
    requestDate?: true
    approvalDate?: true
    paymentDate?: true
    dueDate?: true
    status?: true
    transactionHash?: true
    repaymentTransactionHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdvanceCountAggregateInputType = {
    id?: true
    employeeId?: true
    amount?: true
    repaymentAmount?: true
    requestDate?: true
    approvalDate?: true
    paymentDate?: true
    dueDate?: true
    status?: true
    transactionHash?: true
    repaymentTransactionHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdvanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Advance to aggregate.
     */
    where?: AdvanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advances to fetch.
     */
    orderBy?: AdvanceOrderByWithRelationInput | AdvanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdvanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Advances
    **/
    _count?: true | AdvanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdvanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdvanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdvanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdvanceMaxAggregateInputType
  }

  export type GetAdvanceAggregateType<T extends AdvanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAdvance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdvance[P]>
      : GetScalarType<T[P], AggregateAdvance[P]>
  }




  export type AdvanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdvanceWhereInput
    orderBy?: AdvanceOrderByWithAggregationInput | AdvanceOrderByWithAggregationInput[]
    by: AdvanceScalarFieldEnum[] | AdvanceScalarFieldEnum
    having?: AdvanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdvanceCountAggregateInputType | true
    _avg?: AdvanceAvgAggregateInputType
    _sum?: AdvanceSumAggregateInputType
    _min?: AdvanceMinAggregateInputType
    _max?: AdvanceMaxAggregateInputType
  }

  export type AdvanceGroupByOutputType = {
    id: string
    employeeId: string
    amount: Decimal
    repaymentAmount: Decimal
    requestDate: Date
    approvalDate: Date | null
    paymentDate: Date | null
    dueDate: Date
    status: $Enums.EnumAdvancesStatus
    transactionHash: string | null
    repaymentTransactionHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: AdvanceCountAggregateOutputType | null
    _avg: AdvanceAvgAggregateOutputType | null
    _sum: AdvanceSumAggregateOutputType | null
    _min: AdvanceMinAggregateOutputType | null
    _max: AdvanceMaxAggregateOutputType | null
  }

  type GetAdvanceGroupByPayload<T extends AdvanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdvanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdvanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdvanceGroupByOutputType[P]>
            : GetScalarType<T[P], AdvanceGroupByOutputType[P]>
        }
      >
    >


  export type AdvanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    amount?: boolean
    repaymentAmount?: boolean
    requestDate?: boolean
    approvalDate?: boolean
    paymentDate?: boolean
    dueDate?: boolean
    status?: boolean
    transactionHash?: boolean
    repaymentTransactionHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advance"]>

  export type AdvanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    amount?: boolean
    repaymentAmount?: boolean
    requestDate?: boolean
    approvalDate?: boolean
    paymentDate?: boolean
    dueDate?: boolean
    status?: boolean
    transactionHash?: boolean
    repaymentTransactionHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advance"]>

  export type AdvanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    amount?: boolean
    repaymentAmount?: boolean
    requestDate?: boolean
    approvalDate?: boolean
    paymentDate?: boolean
    dueDate?: boolean
    status?: boolean
    transactionHash?: boolean
    repaymentTransactionHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advance"]>

  export type AdvanceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    amount?: boolean
    repaymentAmount?: boolean
    requestDate?: boolean
    approvalDate?: boolean
    paymentDate?: boolean
    dueDate?: boolean
    status?: boolean
    transactionHash?: boolean
    repaymentTransactionHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdvanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "amount" | "repaymentAmount" | "requestDate" | "approvalDate" | "paymentDate" | "dueDate" | "status" | "transactionHash" | "repaymentTransactionHash" | "createdAt" | "updatedAt", ExtArgs["result"]["advance"]>
  export type AdvanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AdvanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AdvanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $AdvancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Advance"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      amount: Prisma.Decimal
      repaymentAmount: Prisma.Decimal
      requestDate: Date
      approvalDate: Date | null
      paymentDate: Date | null
      dueDate: Date
      status: $Enums.EnumAdvancesStatus
      transactionHash: string | null
      repaymentTransactionHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["advance"]>
    composites: {}
  }

  type AdvanceGetPayload<S extends boolean | null | undefined | AdvanceDefaultArgs> = $Result.GetResult<Prisma.$AdvancePayload, S>

  type AdvanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdvanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdvanceCountAggregateInputType | true
    }

  export interface AdvanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Advance'], meta: { name: 'Advance' } }
    /**
     * Find zero or one Advance that matches the filter.
     * @param {AdvanceFindUniqueArgs} args - Arguments to find a Advance
     * @example
     * // Get one Advance
     * const advance = await prisma.advance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdvanceFindUniqueArgs>(args: SelectSubset<T, AdvanceFindUniqueArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Advance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdvanceFindUniqueOrThrowArgs} args - Arguments to find a Advance
     * @example
     * // Get one Advance
     * const advance = await prisma.advance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdvanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AdvanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Advance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceFindFirstArgs} args - Arguments to find a Advance
     * @example
     * // Get one Advance
     * const advance = await prisma.advance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdvanceFindFirstArgs>(args?: SelectSubset<T, AdvanceFindFirstArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Advance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceFindFirstOrThrowArgs} args - Arguments to find a Advance
     * @example
     * // Get one Advance
     * const advance = await prisma.advance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdvanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AdvanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Advances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Advances
     * const advances = await prisma.advance.findMany()
     * 
     * // Get first 10 Advances
     * const advances = await prisma.advance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const advanceWithIdOnly = await prisma.advance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdvanceFindManyArgs>(args?: SelectSubset<T, AdvanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Advance.
     * @param {AdvanceCreateArgs} args - Arguments to create a Advance.
     * @example
     * // Create one Advance
     * const Advance = await prisma.advance.create({
     *   data: {
     *     // ... data to create a Advance
     *   }
     * })
     * 
     */
    create<T extends AdvanceCreateArgs>(args: SelectSubset<T, AdvanceCreateArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Advances.
     * @param {AdvanceCreateManyArgs} args - Arguments to create many Advances.
     * @example
     * // Create many Advances
     * const advance = await prisma.advance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdvanceCreateManyArgs>(args?: SelectSubset<T, AdvanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Advances and returns the data saved in the database.
     * @param {AdvanceCreateManyAndReturnArgs} args - Arguments to create many Advances.
     * @example
     * // Create many Advances
     * const advance = await prisma.advance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Advances and only return the `id`
     * const advanceWithIdOnly = await prisma.advance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdvanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AdvanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Advance.
     * @param {AdvanceDeleteArgs} args - Arguments to delete one Advance.
     * @example
     * // Delete one Advance
     * const Advance = await prisma.advance.delete({
     *   where: {
     *     // ... filter to delete one Advance
     *   }
     * })
     * 
     */
    delete<T extends AdvanceDeleteArgs>(args: SelectSubset<T, AdvanceDeleteArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Advance.
     * @param {AdvanceUpdateArgs} args - Arguments to update one Advance.
     * @example
     * // Update one Advance
     * const advance = await prisma.advance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdvanceUpdateArgs>(args: SelectSubset<T, AdvanceUpdateArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Advances.
     * @param {AdvanceDeleteManyArgs} args - Arguments to filter Advances to delete.
     * @example
     * // Delete a few Advances
     * const { count } = await prisma.advance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdvanceDeleteManyArgs>(args?: SelectSubset<T, AdvanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Advances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Advances
     * const advance = await prisma.advance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdvanceUpdateManyArgs>(args: SelectSubset<T, AdvanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Advances and returns the data updated in the database.
     * @param {AdvanceUpdateManyAndReturnArgs} args - Arguments to update many Advances.
     * @example
     * // Update many Advances
     * const advance = await prisma.advance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Advances and only return the `id`
     * const advanceWithIdOnly = await prisma.advance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdvanceUpdateManyAndReturnArgs>(args: SelectSubset<T, AdvanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Advance.
     * @param {AdvanceUpsertArgs} args - Arguments to update or create a Advance.
     * @example
     * // Update or create a Advance
     * const advance = await prisma.advance.upsert({
     *   create: {
     *     // ... data to create a Advance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Advance we want to update
     *   }
     * })
     */
    upsert<T extends AdvanceUpsertArgs>(args: SelectSubset<T, AdvanceUpsertArgs<ExtArgs>>): Prisma__AdvanceClient<$Result.GetResult<Prisma.$AdvancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Advances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceCountArgs} args - Arguments to filter Advances to count.
     * @example
     * // Count the number of Advances
     * const count = await prisma.advance.count({
     *   where: {
     *     // ... the filter for the Advances we want to count
     *   }
     * })
    **/
    count<T extends AdvanceCountArgs>(
      args?: Subset<T, AdvanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdvanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Advance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdvanceAggregateArgs>(args: Subset<T, AdvanceAggregateArgs>): Prisma.PrismaPromise<GetAdvanceAggregateType<T>>

    /**
     * Group by Advance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvanceGroupByArgs} args - Group by arguments.
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
      T extends AdvanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdvanceGroupByArgs['orderBy'] }
        : { orderBy?: AdvanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AdvanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdvanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Advance model
   */
  readonly fields: AdvanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Advance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdvanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Advance model
   */
  interface AdvanceFieldRefs {
    readonly id: FieldRef<"Advance", 'String'>
    readonly employeeId: FieldRef<"Advance", 'String'>
    readonly amount: FieldRef<"Advance", 'Decimal'>
    readonly repaymentAmount: FieldRef<"Advance", 'Decimal'>
    readonly requestDate: FieldRef<"Advance", 'DateTime'>
    readonly approvalDate: FieldRef<"Advance", 'DateTime'>
    readonly paymentDate: FieldRef<"Advance", 'DateTime'>
    readonly dueDate: FieldRef<"Advance", 'DateTime'>
    readonly status: FieldRef<"Advance", 'EnumAdvancesStatus'>
    readonly transactionHash: FieldRef<"Advance", 'String'>
    readonly repaymentTransactionHash: FieldRef<"Advance", 'String'>
    readonly createdAt: FieldRef<"Advance", 'DateTime'>
    readonly updatedAt: FieldRef<"Advance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Advance findUnique
   */
  export type AdvanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * Filter, which Advance to fetch.
     */
    where: AdvanceWhereUniqueInput
  }

  /**
   * Advance findUniqueOrThrow
   */
  export type AdvanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * Filter, which Advance to fetch.
     */
    where: AdvanceWhereUniqueInput
  }

  /**
   * Advance findFirst
   */
  export type AdvanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * Filter, which Advance to fetch.
     */
    where?: AdvanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advances to fetch.
     */
    orderBy?: AdvanceOrderByWithRelationInput | AdvanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Advances.
     */
    cursor?: AdvanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advances.
     */
    distinct?: AdvanceScalarFieldEnum | AdvanceScalarFieldEnum[]
  }

  /**
   * Advance findFirstOrThrow
   */
  export type AdvanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * Filter, which Advance to fetch.
     */
    where?: AdvanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advances to fetch.
     */
    orderBy?: AdvanceOrderByWithRelationInput | AdvanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Advances.
     */
    cursor?: AdvanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advances.
     */
    distinct?: AdvanceScalarFieldEnum | AdvanceScalarFieldEnum[]
  }

  /**
   * Advance findMany
   */
  export type AdvanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * Filter, which Advances to fetch.
     */
    where?: AdvanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advances to fetch.
     */
    orderBy?: AdvanceOrderByWithRelationInput | AdvanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Advances.
     */
    cursor?: AdvanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advances.
     */
    skip?: number
    distinct?: AdvanceScalarFieldEnum | AdvanceScalarFieldEnum[]
  }

  /**
   * Advance create
   */
  export type AdvanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Advance.
     */
    data: XOR<AdvanceCreateInput, AdvanceUncheckedCreateInput>
  }

  /**
   * Advance createMany
   */
  export type AdvanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Advances.
     */
    data: AdvanceCreateManyInput | AdvanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Advance createManyAndReturn
   */
  export type AdvanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * The data used to create many Advances.
     */
    data: AdvanceCreateManyInput | AdvanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Advance update
   */
  export type AdvanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Advance.
     */
    data: XOR<AdvanceUpdateInput, AdvanceUncheckedUpdateInput>
    /**
     * Choose, which Advance to update.
     */
    where: AdvanceWhereUniqueInput
  }

  /**
   * Advance updateMany
   */
  export type AdvanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Advances.
     */
    data: XOR<AdvanceUpdateManyMutationInput, AdvanceUncheckedUpdateManyInput>
    /**
     * Filter which Advances to update
     */
    where?: AdvanceWhereInput
    /**
     * Limit how many Advances to update.
     */
    limit?: number
  }

  /**
   * Advance updateManyAndReturn
   */
  export type AdvanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * The data used to update Advances.
     */
    data: XOR<AdvanceUpdateManyMutationInput, AdvanceUncheckedUpdateManyInput>
    /**
     * Filter which Advances to update
     */
    where?: AdvanceWhereInput
    /**
     * Limit how many Advances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Advance upsert
   */
  export type AdvanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Advance to update in case it exists.
     */
    where: AdvanceWhereUniqueInput
    /**
     * In case the Advance found by the `where` argument doesn't exist, create a new Advance with this data.
     */
    create: XOR<AdvanceCreateInput, AdvanceUncheckedCreateInput>
    /**
     * In case the Advance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdvanceUpdateInput, AdvanceUncheckedUpdateInput>
  }

  /**
   * Advance delete
   */
  export type AdvanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
    /**
     * Filter which Advance to delete.
     */
    where: AdvanceWhereUniqueInput
  }

  /**
   * Advance deleteMany
   */
  export type AdvanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Advances to delete
     */
    where?: AdvanceWhereInput
    /**
     * Limit how many Advances to delete.
     */
    limit?: number
  }

  /**
   * Advance without action
   */
  export type AdvanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advance
     */
    select?: AdvanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advance
     */
    omit?: AdvanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvanceInclude<ExtArgs> | null
  }


  /**
   * Model LiquidityPool
   */

  export type AggregateLiquidityPool = {
    _count: LiquidityPoolCountAggregateOutputType | null
    _avg: LiquidityPoolAvgAggregateOutputType | null
    _sum: LiquidityPoolSumAggregateOutputType | null
    _min: LiquidityPoolMinAggregateOutputType | null
    _max: LiquidityPoolMaxAggregateOutputType | null
  }

  export type LiquidityPoolAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type LiquidityPoolSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type LiquidityPoolMinAggregateOutputType = {
    id: string | null
    employerId: string | null
    amount: Decimal | null
    transactionType: $Enums.EnumLiquidityPoolTransactionType | null
    transactionHash: string | null
    timestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LiquidityPoolMaxAggregateOutputType = {
    id: string | null
    employerId: string | null
    amount: Decimal | null
    transactionType: $Enums.EnumLiquidityPoolTransactionType | null
    transactionHash: string | null
    timestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LiquidityPoolCountAggregateOutputType = {
    id: number
    employerId: number
    amount: number
    transactionType: number
    transactionHash: number
    timestamp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LiquidityPoolAvgAggregateInputType = {
    amount?: true
  }

  export type LiquidityPoolSumAggregateInputType = {
    amount?: true
  }

  export type LiquidityPoolMinAggregateInputType = {
    id?: true
    employerId?: true
    amount?: true
    transactionType?: true
    transactionHash?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LiquidityPoolMaxAggregateInputType = {
    id?: true
    employerId?: true
    amount?: true
    transactionType?: true
    transactionHash?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LiquidityPoolCountAggregateInputType = {
    id?: true
    employerId?: true
    amount?: true
    transactionType?: true
    transactionHash?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LiquidityPoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiquidityPool to aggregate.
     */
    where?: LiquidityPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidityPools to fetch.
     */
    orderBy?: LiquidityPoolOrderByWithRelationInput | LiquidityPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiquidityPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidityPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidityPools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiquidityPools
    **/
    _count?: true | LiquidityPoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LiquidityPoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LiquidityPoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiquidityPoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiquidityPoolMaxAggregateInputType
  }

  export type GetLiquidityPoolAggregateType<T extends LiquidityPoolAggregateArgs> = {
        [P in keyof T & keyof AggregateLiquidityPool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiquidityPool[P]>
      : GetScalarType<T[P], AggregateLiquidityPool[P]>
  }




  export type LiquidityPoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiquidityPoolWhereInput
    orderBy?: LiquidityPoolOrderByWithAggregationInput | LiquidityPoolOrderByWithAggregationInput[]
    by: LiquidityPoolScalarFieldEnum[] | LiquidityPoolScalarFieldEnum
    having?: LiquidityPoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiquidityPoolCountAggregateInputType | true
    _avg?: LiquidityPoolAvgAggregateInputType
    _sum?: LiquidityPoolSumAggregateInputType
    _min?: LiquidityPoolMinAggregateInputType
    _max?: LiquidityPoolMaxAggregateInputType
  }

  export type LiquidityPoolGroupByOutputType = {
    id: string
    employerId: string
    amount: Decimal
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    _count: LiquidityPoolCountAggregateOutputType | null
    _avg: LiquidityPoolAvgAggregateOutputType | null
    _sum: LiquidityPoolSumAggregateOutputType | null
    _min: LiquidityPoolMinAggregateOutputType | null
    _max: LiquidityPoolMaxAggregateOutputType | null
  }

  type GetLiquidityPoolGroupByPayload<T extends LiquidityPoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiquidityPoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiquidityPoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiquidityPoolGroupByOutputType[P]>
            : GetScalarType<T[P], LiquidityPoolGroupByOutputType[P]>
        }
      >
    >


  export type LiquidityPoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employerId?: boolean
    amount?: boolean
    transactionType?: boolean
    transactionHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liquidityPool"]>

  export type LiquidityPoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employerId?: boolean
    amount?: boolean
    transactionType?: boolean
    transactionHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liquidityPool"]>

  export type LiquidityPoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employerId?: boolean
    amount?: boolean
    transactionType?: boolean
    transactionHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liquidityPool"]>

  export type LiquidityPoolSelectScalar = {
    id?: boolean
    employerId?: boolean
    amount?: boolean
    transactionType?: boolean
    transactionHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LiquidityPoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employerId" | "amount" | "transactionType" | "transactionHash" | "timestamp" | "createdAt" | "updatedAt", ExtArgs["result"]["liquidityPool"]>
  export type LiquidityPoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }
  export type LiquidityPoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }
  export type LiquidityPoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }

  export type $LiquidityPoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiquidityPool"
    objects: {
      employer: Prisma.$EmployerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employerId: string
      amount: Prisma.Decimal
      transactionType: $Enums.EnumLiquidityPoolTransactionType
      transactionHash: string
      timestamp: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["liquidityPool"]>
    composites: {}
  }

  type LiquidityPoolGetPayload<S extends boolean | null | undefined | LiquidityPoolDefaultArgs> = $Result.GetResult<Prisma.$LiquidityPoolPayload, S>

  type LiquidityPoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiquidityPoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiquidityPoolCountAggregateInputType | true
    }

  export interface LiquidityPoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiquidityPool'], meta: { name: 'LiquidityPool' } }
    /**
     * Find zero or one LiquidityPool that matches the filter.
     * @param {LiquidityPoolFindUniqueArgs} args - Arguments to find a LiquidityPool
     * @example
     * // Get one LiquidityPool
     * const liquidityPool = await prisma.liquidityPool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiquidityPoolFindUniqueArgs>(args: SelectSubset<T, LiquidityPoolFindUniqueArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiquidityPool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiquidityPoolFindUniqueOrThrowArgs} args - Arguments to find a LiquidityPool
     * @example
     * // Get one LiquidityPool
     * const liquidityPool = await prisma.liquidityPool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiquidityPoolFindUniqueOrThrowArgs>(args: SelectSubset<T, LiquidityPoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiquidityPool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolFindFirstArgs} args - Arguments to find a LiquidityPool
     * @example
     * // Get one LiquidityPool
     * const liquidityPool = await prisma.liquidityPool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiquidityPoolFindFirstArgs>(args?: SelectSubset<T, LiquidityPoolFindFirstArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiquidityPool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolFindFirstOrThrowArgs} args - Arguments to find a LiquidityPool
     * @example
     * // Get one LiquidityPool
     * const liquidityPool = await prisma.liquidityPool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiquidityPoolFindFirstOrThrowArgs>(args?: SelectSubset<T, LiquidityPoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiquidityPools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiquidityPools
     * const liquidityPools = await prisma.liquidityPool.findMany()
     * 
     * // Get first 10 LiquidityPools
     * const liquidityPools = await prisma.liquidityPool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liquidityPoolWithIdOnly = await prisma.liquidityPool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiquidityPoolFindManyArgs>(args?: SelectSubset<T, LiquidityPoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiquidityPool.
     * @param {LiquidityPoolCreateArgs} args - Arguments to create a LiquidityPool.
     * @example
     * // Create one LiquidityPool
     * const LiquidityPool = await prisma.liquidityPool.create({
     *   data: {
     *     // ... data to create a LiquidityPool
     *   }
     * })
     * 
     */
    create<T extends LiquidityPoolCreateArgs>(args: SelectSubset<T, LiquidityPoolCreateArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiquidityPools.
     * @param {LiquidityPoolCreateManyArgs} args - Arguments to create many LiquidityPools.
     * @example
     * // Create many LiquidityPools
     * const liquidityPool = await prisma.liquidityPool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiquidityPoolCreateManyArgs>(args?: SelectSubset<T, LiquidityPoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiquidityPools and returns the data saved in the database.
     * @param {LiquidityPoolCreateManyAndReturnArgs} args - Arguments to create many LiquidityPools.
     * @example
     * // Create many LiquidityPools
     * const liquidityPool = await prisma.liquidityPool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiquidityPools and only return the `id`
     * const liquidityPoolWithIdOnly = await prisma.liquidityPool.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiquidityPoolCreateManyAndReturnArgs>(args?: SelectSubset<T, LiquidityPoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiquidityPool.
     * @param {LiquidityPoolDeleteArgs} args - Arguments to delete one LiquidityPool.
     * @example
     * // Delete one LiquidityPool
     * const LiquidityPool = await prisma.liquidityPool.delete({
     *   where: {
     *     // ... filter to delete one LiquidityPool
     *   }
     * })
     * 
     */
    delete<T extends LiquidityPoolDeleteArgs>(args: SelectSubset<T, LiquidityPoolDeleteArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiquidityPool.
     * @param {LiquidityPoolUpdateArgs} args - Arguments to update one LiquidityPool.
     * @example
     * // Update one LiquidityPool
     * const liquidityPool = await prisma.liquidityPool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiquidityPoolUpdateArgs>(args: SelectSubset<T, LiquidityPoolUpdateArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiquidityPools.
     * @param {LiquidityPoolDeleteManyArgs} args - Arguments to filter LiquidityPools to delete.
     * @example
     * // Delete a few LiquidityPools
     * const { count } = await prisma.liquidityPool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiquidityPoolDeleteManyArgs>(args?: SelectSubset<T, LiquidityPoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiquidityPools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiquidityPools
     * const liquidityPool = await prisma.liquidityPool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiquidityPoolUpdateManyArgs>(args: SelectSubset<T, LiquidityPoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiquidityPools and returns the data updated in the database.
     * @param {LiquidityPoolUpdateManyAndReturnArgs} args - Arguments to update many LiquidityPools.
     * @example
     * // Update many LiquidityPools
     * const liquidityPool = await prisma.liquidityPool.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiquidityPools and only return the `id`
     * const liquidityPoolWithIdOnly = await prisma.liquidityPool.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiquidityPoolUpdateManyAndReturnArgs>(args: SelectSubset<T, LiquidityPoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiquidityPool.
     * @param {LiquidityPoolUpsertArgs} args - Arguments to update or create a LiquidityPool.
     * @example
     * // Update or create a LiquidityPool
     * const liquidityPool = await prisma.liquidityPool.upsert({
     *   create: {
     *     // ... data to create a LiquidityPool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiquidityPool we want to update
     *   }
     * })
     */
    upsert<T extends LiquidityPoolUpsertArgs>(args: SelectSubset<T, LiquidityPoolUpsertArgs<ExtArgs>>): Prisma__LiquidityPoolClient<$Result.GetResult<Prisma.$LiquidityPoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiquidityPools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolCountArgs} args - Arguments to filter LiquidityPools to count.
     * @example
     * // Count the number of LiquidityPools
     * const count = await prisma.liquidityPool.count({
     *   where: {
     *     // ... the filter for the LiquidityPools we want to count
     *   }
     * })
    **/
    count<T extends LiquidityPoolCountArgs>(
      args?: Subset<T, LiquidityPoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiquidityPoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiquidityPool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LiquidityPoolAggregateArgs>(args: Subset<T, LiquidityPoolAggregateArgs>): Prisma.PrismaPromise<GetLiquidityPoolAggregateType<T>>

    /**
     * Group by LiquidityPool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidityPoolGroupByArgs} args - Group by arguments.
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
      T extends LiquidityPoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiquidityPoolGroupByArgs['orderBy'] }
        : { orderBy?: LiquidityPoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, LiquidityPoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiquidityPoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiquidityPool model
   */
  readonly fields: LiquidityPoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiquidityPool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiquidityPoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employer<T extends EmployerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployerDefaultArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiquidityPool model
   */
  interface LiquidityPoolFieldRefs {
    readonly id: FieldRef<"LiquidityPool", 'String'>
    readonly employerId: FieldRef<"LiquidityPool", 'String'>
    readonly amount: FieldRef<"LiquidityPool", 'Decimal'>
    readonly transactionType: FieldRef<"LiquidityPool", 'EnumLiquidityPoolTransactionType'>
    readonly transactionHash: FieldRef<"LiquidityPool", 'String'>
    readonly timestamp: FieldRef<"LiquidityPool", 'DateTime'>
    readonly createdAt: FieldRef<"LiquidityPool", 'DateTime'>
    readonly updatedAt: FieldRef<"LiquidityPool", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LiquidityPool findUnique
   */
  export type LiquidityPoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * Filter, which LiquidityPool to fetch.
     */
    where: LiquidityPoolWhereUniqueInput
  }

  /**
   * LiquidityPool findUniqueOrThrow
   */
  export type LiquidityPoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * Filter, which LiquidityPool to fetch.
     */
    where: LiquidityPoolWhereUniqueInput
  }

  /**
   * LiquidityPool findFirst
   */
  export type LiquidityPoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * Filter, which LiquidityPool to fetch.
     */
    where?: LiquidityPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidityPools to fetch.
     */
    orderBy?: LiquidityPoolOrderByWithRelationInput | LiquidityPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiquidityPools.
     */
    cursor?: LiquidityPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidityPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidityPools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiquidityPools.
     */
    distinct?: LiquidityPoolScalarFieldEnum | LiquidityPoolScalarFieldEnum[]
  }

  /**
   * LiquidityPool findFirstOrThrow
   */
  export type LiquidityPoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * Filter, which LiquidityPool to fetch.
     */
    where?: LiquidityPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidityPools to fetch.
     */
    orderBy?: LiquidityPoolOrderByWithRelationInput | LiquidityPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiquidityPools.
     */
    cursor?: LiquidityPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidityPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidityPools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiquidityPools.
     */
    distinct?: LiquidityPoolScalarFieldEnum | LiquidityPoolScalarFieldEnum[]
  }

  /**
   * LiquidityPool findMany
   */
  export type LiquidityPoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * Filter, which LiquidityPools to fetch.
     */
    where?: LiquidityPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidityPools to fetch.
     */
    orderBy?: LiquidityPoolOrderByWithRelationInput | LiquidityPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiquidityPools.
     */
    cursor?: LiquidityPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidityPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidityPools.
     */
    skip?: number
    distinct?: LiquidityPoolScalarFieldEnum | LiquidityPoolScalarFieldEnum[]
  }

  /**
   * LiquidityPool create
   */
  export type LiquidityPoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * The data needed to create a LiquidityPool.
     */
    data: XOR<LiquidityPoolCreateInput, LiquidityPoolUncheckedCreateInput>
  }

  /**
   * LiquidityPool createMany
   */
  export type LiquidityPoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiquidityPools.
     */
    data: LiquidityPoolCreateManyInput | LiquidityPoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiquidityPool createManyAndReturn
   */
  export type LiquidityPoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * The data used to create many LiquidityPools.
     */
    data: LiquidityPoolCreateManyInput | LiquidityPoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiquidityPool update
   */
  export type LiquidityPoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * The data needed to update a LiquidityPool.
     */
    data: XOR<LiquidityPoolUpdateInput, LiquidityPoolUncheckedUpdateInput>
    /**
     * Choose, which LiquidityPool to update.
     */
    where: LiquidityPoolWhereUniqueInput
  }

  /**
   * LiquidityPool updateMany
   */
  export type LiquidityPoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiquidityPools.
     */
    data: XOR<LiquidityPoolUpdateManyMutationInput, LiquidityPoolUncheckedUpdateManyInput>
    /**
     * Filter which LiquidityPools to update
     */
    where?: LiquidityPoolWhereInput
    /**
     * Limit how many LiquidityPools to update.
     */
    limit?: number
  }

  /**
   * LiquidityPool updateManyAndReturn
   */
  export type LiquidityPoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * The data used to update LiquidityPools.
     */
    data: XOR<LiquidityPoolUpdateManyMutationInput, LiquidityPoolUncheckedUpdateManyInput>
    /**
     * Filter which LiquidityPools to update
     */
    where?: LiquidityPoolWhereInput
    /**
     * Limit how many LiquidityPools to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiquidityPool upsert
   */
  export type LiquidityPoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * The filter to search for the LiquidityPool to update in case it exists.
     */
    where: LiquidityPoolWhereUniqueInput
    /**
     * In case the LiquidityPool found by the `where` argument doesn't exist, create a new LiquidityPool with this data.
     */
    create: XOR<LiquidityPoolCreateInput, LiquidityPoolUncheckedCreateInput>
    /**
     * In case the LiquidityPool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiquidityPoolUpdateInput, LiquidityPoolUncheckedUpdateInput>
  }

  /**
   * LiquidityPool delete
   */
  export type LiquidityPoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
    /**
     * Filter which LiquidityPool to delete.
     */
    where: LiquidityPoolWhereUniqueInput
  }

  /**
   * LiquidityPool deleteMany
   */
  export type LiquidityPoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiquidityPools to delete
     */
    where?: LiquidityPoolWhereInput
    /**
     * Limit how many LiquidityPools to delete.
     */
    limit?: number
  }

  /**
   * LiquidityPool without action
   */
  export type LiquidityPoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidityPool
     */
    select?: LiquidityPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidityPool
     */
    omit?: LiquidityPoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidityPoolInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    targetEmail: string | null
    senderUserId: string | null
    recipientUserId: string | null
    expiresAt: Date | null
    status: $Enums.EnumInvitationsStatus | null
    role: $Enums.EnumInvitationsRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    targetEmail: string | null
    senderUserId: string | null
    recipientUserId: string | null
    expiresAt: Date | null
    status: $Enums.EnumInvitationsStatus | null
    role: $Enums.EnumInvitationsRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    targetEmail: number
    senderUserId: number
    recipientUserId: number
    expiresAt: number
    status: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    targetEmail?: true
    senderUserId?: true
    recipientUserId?: true
    expiresAt?: true
    status?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    targetEmail?: true
    senderUserId?: true
    recipientUserId?: true
    expiresAt?: true
    status?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    targetEmail?: true
    senderUserId?: true
    recipientUserId?: true
    expiresAt?: true
    status?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    targetEmail: string
    senderUserId: string
    recipientUserId: string | null
    expiresAt: Date
    status: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt: Date
    updatedAt: Date
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetEmail?: boolean
    senderUserId?: boolean
    recipientUserId?: boolean
    expiresAt?: boolean
    status?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    senderUser?: boolean | UserDefaultArgs<ExtArgs>
    recipientUser?: boolean | Invitation$recipientUserArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetEmail?: boolean
    senderUserId?: boolean
    recipientUserId?: boolean
    expiresAt?: boolean
    status?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    senderUser?: boolean | UserDefaultArgs<ExtArgs>
    recipientUser?: boolean | Invitation$recipientUserArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetEmail?: boolean
    senderUserId?: boolean
    recipientUserId?: boolean
    expiresAt?: boolean
    status?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    senderUser?: boolean | UserDefaultArgs<ExtArgs>
    recipientUser?: boolean | Invitation$recipientUserArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectScalar = {
    id?: boolean
    targetEmail?: boolean
    senderUserId?: boolean
    recipientUserId?: boolean
    expiresAt?: boolean
    status?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "targetEmail" | "senderUserId" | "recipientUserId" | "expiresAt" | "status" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["invitation"]>
  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    senderUser?: boolean | UserDefaultArgs<ExtArgs>
    recipientUser?: boolean | Invitation$recipientUserArgs<ExtArgs>
  }
  export type InvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    senderUser?: boolean | UserDefaultArgs<ExtArgs>
    recipientUser?: boolean | Invitation$recipientUserArgs<ExtArgs>
  }
  export type InvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    senderUser?: boolean | UserDefaultArgs<ExtArgs>
    recipientUser?: boolean | Invitation$recipientUserArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      senderUser: Prisma.$UserPayload<ExtArgs>
      recipientUser: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      targetEmail: string
      senderUserId: string
      recipientUserId: string | null
      expiresAt: Date
      status: $Enums.EnumInvitationsStatus
      role: $Enums.EnumInvitationsRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations and returns the data updated in the database.
     * @param {InvitationUpdateManyAndReturnArgs} args - Arguments to update many Invitations.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, InvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
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
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    senderUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipientUser<T extends Invitation$recipientUserArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$recipientUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'String'>
    readonly targetEmail: FieldRef<"Invitation", 'String'>
    readonly senderUserId: FieldRef<"Invitation", 'String'>
    readonly recipientUserId: FieldRef<"Invitation", 'String'>
    readonly expiresAt: FieldRef<"Invitation", 'DateTime'>
    readonly status: FieldRef<"Invitation", 'EnumInvitationsStatus'>
    readonly role: FieldRef<"Invitation", 'EnumInvitationsRole'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
    readonly updatedAt: FieldRef<"Invitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitation createManyAndReturn
   */
  export type InvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
  }

  /**
   * Invitation updateManyAndReturn
   */
  export type InvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to delete.
     */
    limit?: number
  }

  /**
   * Invitation.recipientUser
   */
  export type Invitation$recipientUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model DemoRequest
   */

  export type AggregateDemoRequest = {
    _count: DemoRequestCountAggregateOutputType | null
    _avg: DemoRequestAvgAggregateOutputType | null
    _sum: DemoRequestSumAggregateOutputType | null
    _min: DemoRequestMinAggregateOutputType | null
    _max: DemoRequestMaxAggregateOutputType | null
  }

  export type DemoRequestAvgAggregateOutputType = {
    id: number | null
    companySize: number | null
  }

  export type DemoRequestSumAggregateOutputType = {
    id: number | null
    companySize: number | null
  }

  export type DemoRequestMinAggregateOutputType = {
    id: number | null
    companyName: string | null
    contactName: string | null
    email: string | null
    phone: string | null
    companySize: number | null
    message: string | null
    status: $Enums.EnumDemoRequestsStatus | null
    scheduledDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DemoRequestMaxAggregateOutputType = {
    id: number | null
    companyName: string | null
    contactName: string | null
    email: string | null
    phone: string | null
    companySize: number | null
    message: string | null
    status: $Enums.EnumDemoRequestsStatus | null
    scheduledDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DemoRequestCountAggregateOutputType = {
    id: number
    companyName: number
    contactName: number
    email: number
    phone: number
    companySize: number
    message: number
    status: number
    scheduledDate: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DemoRequestAvgAggregateInputType = {
    id?: true
    companySize?: true
  }

  export type DemoRequestSumAggregateInputType = {
    id?: true
    companySize?: true
  }

  export type DemoRequestMinAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    email?: true
    phone?: true
    companySize?: true
    message?: true
    status?: true
    scheduledDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DemoRequestMaxAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    email?: true
    phone?: true
    companySize?: true
    message?: true
    status?: true
    scheduledDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DemoRequestCountAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    email?: true
    phone?: true
    companySize?: true
    message?: true
    status?: true
    scheduledDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DemoRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DemoRequest to aggregate.
     */
    where?: DemoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemoRequests to fetch.
     */
    orderBy?: DemoRequestOrderByWithRelationInput | DemoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DemoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemoRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DemoRequests
    **/
    _count?: true | DemoRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DemoRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DemoRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DemoRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DemoRequestMaxAggregateInputType
  }

  export type GetDemoRequestAggregateType<T extends DemoRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateDemoRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDemoRequest[P]>
      : GetScalarType<T[P], AggregateDemoRequest[P]>
  }




  export type DemoRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemoRequestWhereInput
    orderBy?: DemoRequestOrderByWithAggregationInput | DemoRequestOrderByWithAggregationInput[]
    by: DemoRequestScalarFieldEnum[] | DemoRequestScalarFieldEnum
    having?: DemoRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DemoRequestCountAggregateInputType | true
    _avg?: DemoRequestAvgAggregateInputType
    _sum?: DemoRequestSumAggregateInputType
    _min?: DemoRequestMinAggregateInputType
    _max?: DemoRequestMaxAggregateInputType
  }

  export type DemoRequestGroupByOutputType = {
    id: number
    companyName: string
    contactName: string
    email: string
    phone: string
    companySize: number
    message: string | null
    status: $Enums.EnumDemoRequestsStatus
    scheduledDate: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DemoRequestCountAggregateOutputType | null
    _avg: DemoRequestAvgAggregateOutputType | null
    _sum: DemoRequestSumAggregateOutputType | null
    _min: DemoRequestMinAggregateOutputType | null
    _max: DemoRequestMaxAggregateOutputType | null
  }

  type GetDemoRequestGroupByPayload<T extends DemoRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DemoRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DemoRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DemoRequestGroupByOutputType[P]>
            : GetScalarType<T[P], DemoRequestGroupByOutputType[P]>
        }
      >
    >


  export type DemoRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    companySize?: boolean
    message?: boolean
    status?: boolean
    scheduledDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["demoRequest"]>

  export type DemoRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    companySize?: boolean
    message?: boolean
    status?: boolean
    scheduledDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["demoRequest"]>

  export type DemoRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    companySize?: boolean
    message?: boolean
    status?: boolean
    scheduledDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["demoRequest"]>

  export type DemoRequestSelectScalar = {
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    companySize?: boolean
    message?: boolean
    status?: boolean
    scheduledDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DemoRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "contactName" | "email" | "phone" | "companySize" | "message" | "status" | "scheduledDate" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["demoRequest"]>

  export type $DemoRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DemoRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyName: string
      contactName: string
      email: string
      phone: string
      companySize: number
      message: string | null
      status: $Enums.EnumDemoRequestsStatus
      scheduledDate: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["demoRequest"]>
    composites: {}
  }

  type DemoRequestGetPayload<S extends boolean | null | undefined | DemoRequestDefaultArgs> = $Result.GetResult<Prisma.$DemoRequestPayload, S>

  type DemoRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DemoRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DemoRequestCountAggregateInputType | true
    }

  export interface DemoRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DemoRequest'], meta: { name: 'DemoRequest' } }
    /**
     * Find zero or one DemoRequest that matches the filter.
     * @param {DemoRequestFindUniqueArgs} args - Arguments to find a DemoRequest
     * @example
     * // Get one DemoRequest
     * const demoRequest = await prisma.demoRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DemoRequestFindUniqueArgs>(args: SelectSubset<T, DemoRequestFindUniqueArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DemoRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DemoRequestFindUniqueOrThrowArgs} args - Arguments to find a DemoRequest
     * @example
     * // Get one DemoRequest
     * const demoRequest = await prisma.demoRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DemoRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, DemoRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DemoRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestFindFirstArgs} args - Arguments to find a DemoRequest
     * @example
     * // Get one DemoRequest
     * const demoRequest = await prisma.demoRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DemoRequestFindFirstArgs>(args?: SelectSubset<T, DemoRequestFindFirstArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DemoRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestFindFirstOrThrowArgs} args - Arguments to find a DemoRequest
     * @example
     * // Get one DemoRequest
     * const demoRequest = await prisma.demoRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DemoRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, DemoRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DemoRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DemoRequests
     * const demoRequests = await prisma.demoRequest.findMany()
     * 
     * // Get first 10 DemoRequests
     * const demoRequests = await prisma.demoRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const demoRequestWithIdOnly = await prisma.demoRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DemoRequestFindManyArgs>(args?: SelectSubset<T, DemoRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DemoRequest.
     * @param {DemoRequestCreateArgs} args - Arguments to create a DemoRequest.
     * @example
     * // Create one DemoRequest
     * const DemoRequest = await prisma.demoRequest.create({
     *   data: {
     *     // ... data to create a DemoRequest
     *   }
     * })
     * 
     */
    create<T extends DemoRequestCreateArgs>(args: SelectSubset<T, DemoRequestCreateArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DemoRequests.
     * @param {DemoRequestCreateManyArgs} args - Arguments to create many DemoRequests.
     * @example
     * // Create many DemoRequests
     * const demoRequest = await prisma.demoRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DemoRequestCreateManyArgs>(args?: SelectSubset<T, DemoRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DemoRequests and returns the data saved in the database.
     * @param {DemoRequestCreateManyAndReturnArgs} args - Arguments to create many DemoRequests.
     * @example
     * // Create many DemoRequests
     * const demoRequest = await prisma.demoRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DemoRequests and only return the `id`
     * const demoRequestWithIdOnly = await prisma.demoRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DemoRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, DemoRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DemoRequest.
     * @param {DemoRequestDeleteArgs} args - Arguments to delete one DemoRequest.
     * @example
     * // Delete one DemoRequest
     * const DemoRequest = await prisma.demoRequest.delete({
     *   where: {
     *     // ... filter to delete one DemoRequest
     *   }
     * })
     * 
     */
    delete<T extends DemoRequestDeleteArgs>(args: SelectSubset<T, DemoRequestDeleteArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DemoRequest.
     * @param {DemoRequestUpdateArgs} args - Arguments to update one DemoRequest.
     * @example
     * // Update one DemoRequest
     * const demoRequest = await prisma.demoRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DemoRequestUpdateArgs>(args: SelectSubset<T, DemoRequestUpdateArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DemoRequests.
     * @param {DemoRequestDeleteManyArgs} args - Arguments to filter DemoRequests to delete.
     * @example
     * // Delete a few DemoRequests
     * const { count } = await prisma.demoRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DemoRequestDeleteManyArgs>(args?: SelectSubset<T, DemoRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DemoRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DemoRequests
     * const demoRequest = await prisma.demoRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DemoRequestUpdateManyArgs>(args: SelectSubset<T, DemoRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DemoRequests and returns the data updated in the database.
     * @param {DemoRequestUpdateManyAndReturnArgs} args - Arguments to update many DemoRequests.
     * @example
     * // Update many DemoRequests
     * const demoRequest = await prisma.demoRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DemoRequests and only return the `id`
     * const demoRequestWithIdOnly = await prisma.demoRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DemoRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, DemoRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DemoRequest.
     * @param {DemoRequestUpsertArgs} args - Arguments to update or create a DemoRequest.
     * @example
     * // Update or create a DemoRequest
     * const demoRequest = await prisma.demoRequest.upsert({
     *   create: {
     *     // ... data to create a DemoRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DemoRequest we want to update
     *   }
     * })
     */
    upsert<T extends DemoRequestUpsertArgs>(args: SelectSubset<T, DemoRequestUpsertArgs<ExtArgs>>): Prisma__DemoRequestClient<$Result.GetResult<Prisma.$DemoRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DemoRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestCountArgs} args - Arguments to filter DemoRequests to count.
     * @example
     * // Count the number of DemoRequests
     * const count = await prisma.demoRequest.count({
     *   where: {
     *     // ... the filter for the DemoRequests we want to count
     *   }
     * })
    **/
    count<T extends DemoRequestCountArgs>(
      args?: Subset<T, DemoRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DemoRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DemoRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DemoRequestAggregateArgs>(args: Subset<T, DemoRequestAggregateArgs>): Prisma.PrismaPromise<GetDemoRequestAggregateType<T>>

    /**
     * Group by DemoRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoRequestGroupByArgs} args - Group by arguments.
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
      T extends DemoRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DemoRequestGroupByArgs['orderBy'] }
        : { orderBy?: DemoRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DemoRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDemoRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DemoRequest model
   */
  readonly fields: DemoRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DemoRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DemoRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DemoRequest model
   */
  interface DemoRequestFieldRefs {
    readonly id: FieldRef<"DemoRequest", 'Int'>
    readonly companyName: FieldRef<"DemoRequest", 'String'>
    readonly contactName: FieldRef<"DemoRequest", 'String'>
    readonly email: FieldRef<"DemoRequest", 'String'>
    readonly phone: FieldRef<"DemoRequest", 'String'>
    readonly companySize: FieldRef<"DemoRequest", 'Int'>
    readonly message: FieldRef<"DemoRequest", 'String'>
    readonly status: FieldRef<"DemoRequest", 'EnumDemoRequestsStatus'>
    readonly scheduledDate: FieldRef<"DemoRequest", 'DateTime'>
    readonly notes: FieldRef<"DemoRequest", 'String'>
    readonly createdAt: FieldRef<"DemoRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"DemoRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DemoRequest findUnique
   */
  export type DemoRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * Filter, which DemoRequest to fetch.
     */
    where: DemoRequestWhereUniqueInput
  }

  /**
   * DemoRequest findUniqueOrThrow
   */
  export type DemoRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * Filter, which DemoRequest to fetch.
     */
    where: DemoRequestWhereUniqueInput
  }

  /**
   * DemoRequest findFirst
   */
  export type DemoRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * Filter, which DemoRequest to fetch.
     */
    where?: DemoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemoRequests to fetch.
     */
    orderBy?: DemoRequestOrderByWithRelationInput | DemoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DemoRequests.
     */
    cursor?: DemoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemoRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DemoRequests.
     */
    distinct?: DemoRequestScalarFieldEnum | DemoRequestScalarFieldEnum[]
  }

  /**
   * DemoRequest findFirstOrThrow
   */
  export type DemoRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * Filter, which DemoRequest to fetch.
     */
    where?: DemoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemoRequests to fetch.
     */
    orderBy?: DemoRequestOrderByWithRelationInput | DemoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DemoRequests.
     */
    cursor?: DemoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemoRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DemoRequests.
     */
    distinct?: DemoRequestScalarFieldEnum | DemoRequestScalarFieldEnum[]
  }

  /**
   * DemoRequest findMany
   */
  export type DemoRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * Filter, which DemoRequests to fetch.
     */
    where?: DemoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemoRequests to fetch.
     */
    orderBy?: DemoRequestOrderByWithRelationInput | DemoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DemoRequests.
     */
    cursor?: DemoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemoRequests.
     */
    skip?: number
    distinct?: DemoRequestScalarFieldEnum | DemoRequestScalarFieldEnum[]
  }

  /**
   * DemoRequest create
   */
  export type DemoRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a DemoRequest.
     */
    data: XOR<DemoRequestCreateInput, DemoRequestUncheckedCreateInput>
  }

  /**
   * DemoRequest createMany
   */
  export type DemoRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DemoRequests.
     */
    data: DemoRequestCreateManyInput | DemoRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DemoRequest createManyAndReturn
   */
  export type DemoRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * The data used to create many DemoRequests.
     */
    data: DemoRequestCreateManyInput | DemoRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DemoRequest update
   */
  export type DemoRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a DemoRequest.
     */
    data: XOR<DemoRequestUpdateInput, DemoRequestUncheckedUpdateInput>
    /**
     * Choose, which DemoRequest to update.
     */
    where: DemoRequestWhereUniqueInput
  }

  /**
   * DemoRequest updateMany
   */
  export type DemoRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DemoRequests.
     */
    data: XOR<DemoRequestUpdateManyMutationInput, DemoRequestUncheckedUpdateManyInput>
    /**
     * Filter which DemoRequests to update
     */
    where?: DemoRequestWhereInput
    /**
     * Limit how many DemoRequests to update.
     */
    limit?: number
  }

  /**
   * DemoRequest updateManyAndReturn
   */
  export type DemoRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * The data used to update DemoRequests.
     */
    data: XOR<DemoRequestUpdateManyMutationInput, DemoRequestUncheckedUpdateManyInput>
    /**
     * Filter which DemoRequests to update
     */
    where?: DemoRequestWhereInput
    /**
     * Limit how many DemoRequests to update.
     */
    limit?: number
  }

  /**
   * DemoRequest upsert
   */
  export type DemoRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the DemoRequest to update in case it exists.
     */
    where: DemoRequestWhereUniqueInput
    /**
     * In case the DemoRequest found by the `where` argument doesn't exist, create a new DemoRequest with this data.
     */
    create: XOR<DemoRequestCreateInput, DemoRequestUncheckedCreateInput>
    /**
     * In case the DemoRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DemoRequestUpdateInput, DemoRequestUncheckedUpdateInput>
  }

  /**
   * DemoRequest delete
   */
  export type DemoRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
    /**
     * Filter which DemoRequest to delete.
     */
    where: DemoRequestWhereUniqueInput
  }

  /**
   * DemoRequest deleteMany
   */
  export type DemoRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DemoRequests to delete
     */
    where?: DemoRequestWhereInput
    /**
     * Limit how many DemoRequests to delete.
     */
    limit?: number
  }

  /**
   * DemoRequest without action
   */
  export type DemoRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemoRequest
     */
    select?: DemoRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemoRequest
     */
    omit?: DemoRequestOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    walletAddress: 'walletAddress',
    isActive: 'isActive',
    isWalletVerified: 'isWalletVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MarketerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    registrationDate: 'registrationDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MarketerScalarFieldEnum = (typeof MarketerScalarFieldEnum)[keyof typeof MarketerScalarFieldEnum]


  export const EmployerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    marketerId: 'marketerId',
    companyName: 'companyName',
    registrationDate: 'registrationDate',
    isVerified: 'isVerified',
    verificationDate: 'verificationDate',
    verifiedBy: 'verifiedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployerScalarFieldEnum = (typeof EmployerScalarFieldEnum)[keyof typeof EmployerScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    employerId: 'employerId',
    kycStage: 'kycStage',
    kycStatus: 'kycStatus',
    kycSubmittedAt: 'kycSubmittedAt',
    kycReviewedAt: 'kycReviewedAt',
    kycReviewerId: 'kycReviewerId',
    kycNotes: 'kycNotes',
    salary: 'salary',
    registrationDate: 'registrationDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const AdvanceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    amount: 'amount',
    repaymentAmount: 'repaymentAmount',
    requestDate: 'requestDate',
    approvalDate: 'approvalDate',
    paymentDate: 'paymentDate',
    dueDate: 'dueDate',
    status: 'status',
    transactionHash: 'transactionHash',
    repaymentTransactionHash: 'repaymentTransactionHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdvanceScalarFieldEnum = (typeof AdvanceScalarFieldEnum)[keyof typeof AdvanceScalarFieldEnum]


  export const LiquidityPoolScalarFieldEnum: {
    id: 'id',
    employerId: 'employerId',
    amount: 'amount',
    transactionType: 'transactionType',
    transactionHash: 'transactionHash',
    timestamp: 'timestamp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LiquidityPoolScalarFieldEnum = (typeof LiquidityPoolScalarFieldEnum)[keyof typeof LiquidityPoolScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    targetEmail: 'targetEmail',
    senderUserId: 'senderUserId',
    recipientUserId: 'recipientUserId',
    expiresAt: 'expiresAt',
    status: 'status',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const DemoRequestScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    contactName: 'contactName',
    email: 'email',
    phone: 'phone',
    companySize: 'companySize',
    message: 'message',
    status: 'status',
    scheduledDate: 'scheduledDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DemoRequestScalarFieldEnum = (typeof DemoRequestScalarFieldEnum)[keyof typeof DemoRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'EnumUsersRole'
   */
  export type EnumEnumUsersRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumUsersRole'>
    


  /**
   * Reference to a field of type 'EnumUsersRole[]'
   */
  export type ListEnumEnumUsersRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumUsersRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EnumEmployeesKycStage'
   */
  export type EnumEnumEmployeesKycStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumEmployeesKycStage'>
    


  /**
   * Reference to a field of type 'EnumEmployeesKycStage[]'
   */
  export type ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumEmployeesKycStage[]'>
    


  /**
   * Reference to a field of type 'EnumEmployeesKycStatus'
   */
  export type EnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumEmployeesKycStatus'>
    


  /**
   * Reference to a field of type 'EnumEmployeesKycStatus[]'
   */
  export type ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumEmployeesKycStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'EnumAdvancesStatus'
   */
  export type EnumEnumAdvancesStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumAdvancesStatus'>
    


  /**
   * Reference to a field of type 'EnumAdvancesStatus[]'
   */
  export type ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumAdvancesStatus[]'>
    


  /**
   * Reference to a field of type 'EnumLiquidityPoolTransactionType'
   */
  export type EnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumLiquidityPoolTransactionType'>
    


  /**
   * Reference to a field of type 'EnumLiquidityPoolTransactionType[]'
   */
  export type ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumLiquidityPoolTransactionType[]'>
    


  /**
   * Reference to a field of type 'EnumInvitationsStatus'
   */
  export type EnumEnumInvitationsStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumInvitationsStatus'>
    


  /**
   * Reference to a field of type 'EnumInvitationsStatus[]'
   */
  export type ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumInvitationsStatus[]'>
    


  /**
   * Reference to a field of type 'EnumInvitationsRole'
   */
  export type EnumEnumInvitationsRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumInvitationsRole'>
    


  /**
   * Reference to a field of type 'EnumInvitationsRole[]'
   */
  export type ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumInvitationsRole[]'>
    


  /**
   * Reference to a field of type 'EnumDemoRequestsStatus'
   */
  export type EnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumDemoRequestsStatus'>
    


  /**
   * Reference to a field of type 'EnumDemoRequestsStatus[]'
   */
  export type ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnumDemoRequestsStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumEnumUsersRoleFilter<"User"> | $Enums.EnumUsersRole
    walletAddress?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isWalletVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    marketer?: XOR<MarketerNullableScalarRelationFilter, MarketerWhereInput> | null
    employer?: XOR<EmployerNullableScalarRelationFilter, EmployerWhereInput> | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    verifiedEmployers?: EmployerListRelationFilter
    kycReviewerEmployees?: EmployeeListRelationFilter
    sentInvitations?: InvitationListRelationFilter
    receivedInvitations?: InvitationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isWalletVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    marketer?: MarketerOrderByWithRelationInput
    employer?: EmployerOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
    verifiedEmployers?: EmployerOrderByRelationAggregateInput
    kycReviewerEmployees?: EmployeeOrderByRelationAggregateInput
    sentInvitations?: InvitationOrderByRelationAggregateInput
    receivedInvitations?: InvitationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    walletAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumEnumUsersRoleFilter<"User"> | $Enums.EnumUsersRole
    isActive?: BoolFilter<"User"> | boolean
    isWalletVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    marketer?: XOR<MarketerNullableScalarRelationFilter, MarketerWhereInput> | null
    employer?: XOR<EmployerNullableScalarRelationFilter, EmployerWhereInput> | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    verifiedEmployers?: EmployerListRelationFilter
    kycReviewerEmployees?: EmployeeListRelationFilter
    sentInvitations?: InvitationListRelationFilter
    receivedInvitations?: InvitationListRelationFilter
  }, "id" | "username" | "email" | "walletAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isWalletVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumEnumUsersRoleWithAggregatesFilter<"User"> | $Enums.EnumUsersRole
    walletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isWalletVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MarketerWhereInput = {
    AND?: MarketerWhereInput | MarketerWhereInput[]
    OR?: MarketerWhereInput[]
    NOT?: MarketerWhereInput | MarketerWhereInput[]
    id?: IntFilter<"Marketer"> | number
    userId?: UuidFilter<"Marketer"> | string
    registrationDate?: DateTimeFilter<"Marketer"> | Date | string
    createdAt?: DateTimeFilter<"Marketer"> | Date | string
    updatedAt?: DateTimeFilter<"Marketer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    employers?: EmployerListRelationFilter
  }

  export type MarketerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    employers?: EmployerOrderByRelationAggregateInput
  }

  export type MarketerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: MarketerWhereInput | MarketerWhereInput[]
    OR?: MarketerWhereInput[]
    NOT?: MarketerWhereInput | MarketerWhereInput[]
    registrationDate?: DateTimeFilter<"Marketer"> | Date | string
    createdAt?: DateTimeFilter<"Marketer"> | Date | string
    updatedAt?: DateTimeFilter<"Marketer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    employers?: EmployerListRelationFilter
  }, "id" | "userId">

  export type MarketerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MarketerCountOrderByAggregateInput
    _avg?: MarketerAvgOrderByAggregateInput
    _max?: MarketerMaxOrderByAggregateInput
    _min?: MarketerMinOrderByAggregateInput
    _sum?: MarketerSumOrderByAggregateInput
  }

  export type MarketerScalarWhereWithAggregatesInput = {
    AND?: MarketerScalarWhereWithAggregatesInput | MarketerScalarWhereWithAggregatesInput[]
    OR?: MarketerScalarWhereWithAggregatesInput[]
    NOT?: MarketerScalarWhereWithAggregatesInput | MarketerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Marketer"> | number
    userId?: UuidWithAggregatesFilter<"Marketer"> | string
    registrationDate?: DateTimeWithAggregatesFilter<"Marketer"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Marketer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Marketer"> | Date | string
  }

  export type EmployerWhereInput = {
    AND?: EmployerWhereInput | EmployerWhereInput[]
    OR?: EmployerWhereInput[]
    NOT?: EmployerWhereInput | EmployerWhereInput[]
    id?: UuidFilter<"Employer"> | string
    userId?: UuidFilter<"Employer"> | string
    marketerId?: IntNullableFilter<"Employer"> | number | null
    companyName?: StringFilter<"Employer"> | string
    registrationDate?: DateTimeFilter<"Employer"> | Date | string
    isVerified?: BoolFilter<"Employer"> | boolean
    verificationDate?: DateTimeNullableFilter<"Employer"> | Date | string | null
    verifiedBy?: UuidNullableFilter<"Employer"> | string | null
    createdAt?: DateTimeFilter<"Employer"> | Date | string
    updatedAt?: DateTimeFilter<"Employer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    marketer?: XOR<MarketerNullableScalarRelationFilter, MarketerWhereInput> | null
    verifiedByUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    employees?: EmployeeListRelationFilter
    liquidityPools?: LiquidityPoolListRelationFilter
  }

  export type EmployerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    marketerId?: SortOrderInput | SortOrder
    companyName?: SortOrder
    registrationDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    marketer?: MarketerOrderByWithRelationInput
    verifiedByUser?: UserOrderByWithRelationInput
    employees?: EmployeeOrderByRelationAggregateInput
    liquidityPools?: LiquidityPoolOrderByRelationAggregateInput
  }

  export type EmployerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    companyName?: string
    AND?: EmployerWhereInput | EmployerWhereInput[]
    OR?: EmployerWhereInput[]
    NOT?: EmployerWhereInput | EmployerWhereInput[]
    marketerId?: IntNullableFilter<"Employer"> | number | null
    registrationDate?: DateTimeFilter<"Employer"> | Date | string
    isVerified?: BoolFilter<"Employer"> | boolean
    verificationDate?: DateTimeNullableFilter<"Employer"> | Date | string | null
    verifiedBy?: UuidNullableFilter<"Employer"> | string | null
    createdAt?: DateTimeFilter<"Employer"> | Date | string
    updatedAt?: DateTimeFilter<"Employer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    marketer?: XOR<MarketerNullableScalarRelationFilter, MarketerWhereInput> | null
    verifiedByUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    employees?: EmployeeListRelationFilter
    liquidityPools?: LiquidityPoolListRelationFilter
  }, "id" | "userId" | "companyName">

  export type EmployerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    marketerId?: SortOrderInput | SortOrder
    companyName?: SortOrder
    registrationDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployerCountOrderByAggregateInput
    _avg?: EmployerAvgOrderByAggregateInput
    _max?: EmployerMaxOrderByAggregateInput
    _min?: EmployerMinOrderByAggregateInput
    _sum?: EmployerSumOrderByAggregateInput
  }

  export type EmployerScalarWhereWithAggregatesInput = {
    AND?: EmployerScalarWhereWithAggregatesInput | EmployerScalarWhereWithAggregatesInput[]
    OR?: EmployerScalarWhereWithAggregatesInput[]
    NOT?: EmployerScalarWhereWithAggregatesInput | EmployerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Employer"> | string
    userId?: UuidWithAggregatesFilter<"Employer"> | string
    marketerId?: IntNullableWithAggregatesFilter<"Employer"> | number | null
    companyName?: StringWithAggregatesFilter<"Employer"> | string
    registrationDate?: DateTimeWithAggregatesFilter<"Employer"> | Date | string
    isVerified?: BoolWithAggregatesFilter<"Employer"> | boolean
    verificationDate?: DateTimeNullableWithAggregatesFilter<"Employer"> | Date | string | null
    verifiedBy?: UuidNullableWithAggregatesFilter<"Employer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Employer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employer"> | Date | string
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: UuidFilter<"Employee"> | string
    userId?: UuidFilter<"Employee"> | string
    employerId?: UuidFilter<"Employee"> | string
    kycStage?: EnumEnumEmployeesKycStageFilter<"Employee"> | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFilter<"Employee"> | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: DateTimeNullableFilter<"Employee"> | Date | string | null
    kycReviewedAt?: DateTimeNullableFilter<"Employee"> | Date | string | null
    kycReviewerId?: UuidNullableFilter<"Employee"> | string | null
    kycNotes?: StringNullableFilter<"Employee"> | string | null
    salary?: DecimalNullableFilter<"Employee"> | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFilter<"Employee"> | Date | string
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
    kycReviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    advances?: AdvanceListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    employerId?: SortOrder
    kycStage?: SortOrder
    kycStatus?: SortOrder
    kycSubmittedAt?: SortOrderInput | SortOrder
    kycReviewedAt?: SortOrderInput | SortOrder
    kycReviewerId?: SortOrderInput | SortOrder
    kycNotes?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    employer?: EmployerOrderByWithRelationInput
    kycReviewer?: UserOrderByWithRelationInput
    advances?: AdvanceOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    employerId?: UuidFilter<"Employee"> | string
    kycStage?: EnumEnumEmployeesKycStageFilter<"Employee"> | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFilter<"Employee"> | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: DateTimeNullableFilter<"Employee"> | Date | string | null
    kycReviewedAt?: DateTimeNullableFilter<"Employee"> | Date | string | null
    kycReviewerId?: UuidNullableFilter<"Employee"> | string | null
    kycNotes?: StringNullableFilter<"Employee"> | string | null
    salary?: DecimalNullableFilter<"Employee"> | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFilter<"Employee"> | Date | string
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
    kycReviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    advances?: AdvanceListRelationFilter
  }, "id" | "userId">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    employerId?: SortOrder
    kycStage?: SortOrder
    kycStatus?: SortOrder
    kycSubmittedAt?: SortOrderInput | SortOrder
    kycReviewedAt?: SortOrderInput | SortOrder
    kycReviewerId?: SortOrderInput | SortOrder
    kycNotes?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _avg?: EmployeeAvgOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
    _sum?: EmployeeSumOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Employee"> | string
    userId?: UuidWithAggregatesFilter<"Employee"> | string
    employerId?: UuidWithAggregatesFilter<"Employee"> | string
    kycStage?: EnumEnumEmployeesKycStageWithAggregatesFilter<"Employee"> | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusWithAggregatesFilter<"Employee"> | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: DateTimeNullableWithAggregatesFilter<"Employee"> | Date | string | null
    kycReviewedAt?: DateTimeNullableWithAggregatesFilter<"Employee"> | Date | string | null
    kycReviewerId?: UuidNullableWithAggregatesFilter<"Employee"> | string | null
    kycNotes?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    salary?: DecimalNullableWithAggregatesFilter<"Employee"> | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type AdvanceWhereInput = {
    AND?: AdvanceWhereInput | AdvanceWhereInput[]
    OR?: AdvanceWhereInput[]
    NOT?: AdvanceWhereInput | AdvanceWhereInput[]
    id?: UuidFilter<"Advance"> | string
    employeeId?: UuidFilter<"Advance"> | string
    amount?: DecimalFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFilter<"Advance"> | Date | string
    approvalDate?: DateTimeNullableFilter<"Advance"> | Date | string | null
    paymentDate?: DateTimeNullableFilter<"Advance"> | Date | string | null
    dueDate?: DateTimeFilter<"Advance"> | Date | string
    status?: EnumEnumAdvancesStatusFilter<"Advance"> | $Enums.EnumAdvancesStatus
    transactionHash?: StringNullableFilter<"Advance"> | string | null
    repaymentTransactionHash?: StringNullableFilter<"Advance"> | string | null
    createdAt?: DateTimeFilter<"Advance"> | Date | string
    updatedAt?: DateTimeFilter<"Advance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type AdvanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    amount?: SortOrder
    repaymentAmount?: SortOrder
    requestDate?: SortOrder
    approvalDate?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrderInput | SortOrder
    repaymentTransactionHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type AdvanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdvanceWhereInput | AdvanceWhereInput[]
    OR?: AdvanceWhereInput[]
    NOT?: AdvanceWhereInput | AdvanceWhereInput[]
    employeeId?: UuidFilter<"Advance"> | string
    amount?: DecimalFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFilter<"Advance"> | Date | string
    approvalDate?: DateTimeNullableFilter<"Advance"> | Date | string | null
    paymentDate?: DateTimeNullableFilter<"Advance"> | Date | string | null
    dueDate?: DateTimeFilter<"Advance"> | Date | string
    status?: EnumEnumAdvancesStatusFilter<"Advance"> | $Enums.EnumAdvancesStatus
    transactionHash?: StringNullableFilter<"Advance"> | string | null
    repaymentTransactionHash?: StringNullableFilter<"Advance"> | string | null
    createdAt?: DateTimeFilter<"Advance"> | Date | string
    updatedAt?: DateTimeFilter<"Advance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type AdvanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    amount?: SortOrder
    repaymentAmount?: SortOrder
    requestDate?: SortOrder
    approvalDate?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrderInput | SortOrder
    repaymentTransactionHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdvanceCountOrderByAggregateInput
    _avg?: AdvanceAvgOrderByAggregateInput
    _max?: AdvanceMaxOrderByAggregateInput
    _min?: AdvanceMinOrderByAggregateInput
    _sum?: AdvanceSumOrderByAggregateInput
  }

  export type AdvanceScalarWhereWithAggregatesInput = {
    AND?: AdvanceScalarWhereWithAggregatesInput | AdvanceScalarWhereWithAggregatesInput[]
    OR?: AdvanceScalarWhereWithAggregatesInput[]
    NOT?: AdvanceScalarWhereWithAggregatesInput | AdvanceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Advance"> | string
    employeeId?: UuidWithAggregatesFilter<"Advance"> | string
    amount?: DecimalWithAggregatesFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalWithAggregatesFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeWithAggregatesFilter<"Advance"> | Date | string
    approvalDate?: DateTimeNullableWithAggregatesFilter<"Advance"> | Date | string | null
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Advance"> | Date | string | null
    dueDate?: DateTimeWithAggregatesFilter<"Advance"> | Date | string
    status?: EnumEnumAdvancesStatusWithAggregatesFilter<"Advance"> | $Enums.EnumAdvancesStatus
    transactionHash?: StringNullableWithAggregatesFilter<"Advance"> | string | null
    repaymentTransactionHash?: StringNullableWithAggregatesFilter<"Advance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Advance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Advance"> | Date | string
  }

  export type LiquidityPoolWhereInput = {
    AND?: LiquidityPoolWhereInput | LiquidityPoolWhereInput[]
    OR?: LiquidityPoolWhereInput[]
    NOT?: LiquidityPoolWhereInput | LiquidityPoolWhereInput[]
    id?: UuidFilter<"LiquidityPool"> | string
    employerId?: UuidFilter<"LiquidityPool"> | string
    amount?: DecimalFilter<"LiquidityPool"> | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFilter<"LiquidityPool"> | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFilter<"LiquidityPool"> | string
    timestamp?: DateTimeFilter<"LiquidityPool"> | Date | string
    createdAt?: DateTimeFilter<"LiquidityPool"> | Date | string
    updatedAt?: DateTimeFilter<"LiquidityPool"> | Date | string
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
  }

  export type LiquidityPoolOrderByWithRelationInput = {
    id?: SortOrder
    employerId?: SortOrder
    amount?: SortOrder
    transactionType?: SortOrder
    transactionHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employer?: EmployerOrderByWithRelationInput
  }

  export type LiquidityPoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionHash?: string
    AND?: LiquidityPoolWhereInput | LiquidityPoolWhereInput[]
    OR?: LiquidityPoolWhereInput[]
    NOT?: LiquidityPoolWhereInput | LiquidityPoolWhereInput[]
    employerId?: UuidFilter<"LiquidityPool"> | string
    amount?: DecimalFilter<"LiquidityPool"> | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFilter<"LiquidityPool"> | $Enums.EnumLiquidityPoolTransactionType
    timestamp?: DateTimeFilter<"LiquidityPool"> | Date | string
    createdAt?: DateTimeFilter<"LiquidityPool"> | Date | string
    updatedAt?: DateTimeFilter<"LiquidityPool"> | Date | string
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
  }, "id" | "transactionHash">

  export type LiquidityPoolOrderByWithAggregationInput = {
    id?: SortOrder
    employerId?: SortOrder
    amount?: SortOrder
    transactionType?: SortOrder
    transactionHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LiquidityPoolCountOrderByAggregateInput
    _avg?: LiquidityPoolAvgOrderByAggregateInput
    _max?: LiquidityPoolMaxOrderByAggregateInput
    _min?: LiquidityPoolMinOrderByAggregateInput
    _sum?: LiquidityPoolSumOrderByAggregateInput
  }

  export type LiquidityPoolScalarWhereWithAggregatesInput = {
    AND?: LiquidityPoolScalarWhereWithAggregatesInput | LiquidityPoolScalarWhereWithAggregatesInput[]
    OR?: LiquidityPoolScalarWhereWithAggregatesInput[]
    NOT?: LiquidityPoolScalarWhereWithAggregatesInput | LiquidityPoolScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"LiquidityPool"> | string
    employerId?: UuidWithAggregatesFilter<"LiquidityPool"> | string
    amount?: DecimalWithAggregatesFilter<"LiquidityPool"> | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeWithAggregatesFilter<"LiquidityPool"> | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringWithAggregatesFilter<"LiquidityPool"> | string
    timestamp?: DateTimeWithAggregatesFilter<"LiquidityPool"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"LiquidityPool"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LiquidityPool"> | Date | string
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: UuidFilter<"Invitation"> | string
    targetEmail?: StringFilter<"Invitation"> | string
    senderUserId?: UuidFilter<"Invitation"> | string
    recipientUserId?: UuidNullableFilter<"Invitation"> | string | null
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    status?: EnumEnumInvitationsStatusFilter<"Invitation"> | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFilter<"Invitation"> | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeFilter<"Invitation"> | Date | string
    senderUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipientUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    targetEmail?: SortOrder
    senderUserId?: SortOrder
    recipientUserId?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    senderUser?: UserOrderByWithRelationInput
    recipientUser?: UserOrderByWithRelationInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    targetEmail?: StringFilter<"Invitation"> | string
    senderUserId?: UuidFilter<"Invitation"> | string
    recipientUserId?: UuidNullableFilter<"Invitation"> | string | null
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    status?: EnumEnumInvitationsStatusFilter<"Invitation"> | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFilter<"Invitation"> | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeFilter<"Invitation"> | Date | string
    senderUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipientUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    targetEmail?: SortOrder
    senderUserId?: SortOrder
    recipientUserId?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Invitation"> | string
    targetEmail?: StringWithAggregatesFilter<"Invitation"> | string
    senderUserId?: UuidWithAggregatesFilter<"Invitation"> | string
    recipientUserId?: UuidNullableWithAggregatesFilter<"Invitation"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    status?: EnumEnumInvitationsStatusWithAggregatesFilter<"Invitation"> | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleWithAggregatesFilter<"Invitation"> | $Enums.EnumInvitationsRole
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
  }

  export type DemoRequestWhereInput = {
    AND?: DemoRequestWhereInput | DemoRequestWhereInput[]
    OR?: DemoRequestWhereInput[]
    NOT?: DemoRequestWhereInput | DemoRequestWhereInput[]
    id?: IntFilter<"DemoRequest"> | number
    companyName?: StringFilter<"DemoRequest"> | string
    contactName?: StringFilter<"DemoRequest"> | string
    email?: StringFilter<"DemoRequest"> | string
    phone?: StringFilter<"DemoRequest"> | string
    companySize?: IntFilter<"DemoRequest"> | number
    message?: StringNullableFilter<"DemoRequest"> | string | null
    status?: EnumEnumDemoRequestsStatusFilter<"DemoRequest"> | $Enums.EnumDemoRequestsStatus
    scheduledDate?: DateTimeNullableFilter<"DemoRequest"> | Date | string | null
    notes?: StringNullableFilter<"DemoRequest"> | string | null
    createdAt?: DateTimeFilter<"DemoRequest"> | Date | string
    updatedAt?: DateTimeFilter<"DemoRequest"> | Date | string
  }

  export type DemoRequestOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    companySize?: SortOrder
    message?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemoRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: DemoRequestWhereInput | DemoRequestWhereInput[]
    OR?: DemoRequestWhereInput[]
    NOT?: DemoRequestWhereInput | DemoRequestWhereInput[]
    companyName?: StringFilter<"DemoRequest"> | string
    contactName?: StringFilter<"DemoRequest"> | string
    phone?: StringFilter<"DemoRequest"> | string
    companySize?: IntFilter<"DemoRequest"> | number
    message?: StringNullableFilter<"DemoRequest"> | string | null
    status?: EnumEnumDemoRequestsStatusFilter<"DemoRequest"> | $Enums.EnumDemoRequestsStatus
    scheduledDate?: DateTimeNullableFilter<"DemoRequest"> | Date | string | null
    notes?: StringNullableFilter<"DemoRequest"> | string | null
    createdAt?: DateTimeFilter<"DemoRequest"> | Date | string
    updatedAt?: DateTimeFilter<"DemoRequest"> | Date | string
  }, "id" | "email">

  export type DemoRequestOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    companySize?: SortOrder
    message?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DemoRequestCountOrderByAggregateInput
    _avg?: DemoRequestAvgOrderByAggregateInput
    _max?: DemoRequestMaxOrderByAggregateInput
    _min?: DemoRequestMinOrderByAggregateInput
    _sum?: DemoRequestSumOrderByAggregateInput
  }

  export type DemoRequestScalarWhereWithAggregatesInput = {
    AND?: DemoRequestScalarWhereWithAggregatesInput | DemoRequestScalarWhereWithAggregatesInput[]
    OR?: DemoRequestScalarWhereWithAggregatesInput[]
    NOT?: DemoRequestScalarWhereWithAggregatesInput | DemoRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DemoRequest"> | number
    companyName?: StringWithAggregatesFilter<"DemoRequest"> | string
    contactName?: StringWithAggregatesFilter<"DemoRequest"> | string
    email?: StringWithAggregatesFilter<"DemoRequest"> | string
    phone?: StringWithAggregatesFilter<"DemoRequest"> | string
    companySize?: IntWithAggregatesFilter<"DemoRequest"> | number
    message?: StringNullableWithAggregatesFilter<"DemoRequest"> | string | null
    status?: EnumEnumDemoRequestsStatusWithAggregatesFilter<"DemoRequest"> | $Enums.EnumDemoRequestsStatus
    scheduledDate?: DateTimeNullableWithAggregatesFilter<"DemoRequest"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"DemoRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DemoRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DemoRequest"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employer?: EmployerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employer?: EmployerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketerCreateInput = {
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMarketerInput
    employers?: EmployerCreateNestedManyWithoutMarketerInput
  }

  export type MarketerUncheckedCreateInput = {
    id?: number
    userId: string
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employers?: EmployerUncheckedCreateNestedManyWithoutMarketerInput
  }

  export type MarketerUpdateInput = {
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMarketerNestedInput
    employers?: EmployerUpdateManyWithoutMarketerNestedInput
  }

  export type MarketerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employers?: EmployerUncheckedUpdateManyWithoutMarketerNestedInput
  }

  export type MarketerCreateManyInput = {
    id?: number
    userId: string
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarketerUpdateManyMutationInput = {
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerCreateInput = {
    id?: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployerInput
    marketer?: MarketerCreateNestedOneWithoutEmployersInput
    verifiedByUser?: UserCreateNestedOneWithoutVerifiedEmployersInput
    employees?: EmployeeCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateInput = {
    id?: string
    userId: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployerNestedInput
    marketer?: MarketerUpdateOneWithoutEmployersNestedInput
    verifiedByUser?: UserUpdateOneWithoutVerifiedEmployersNestedInput
    employees?: EmployeeUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerCreateManyInput = {
    id?: string
    userId: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    employer: EmployerCreateNestedOneWithoutEmployeesInput
    kycReviewer?: UserCreateNestedOneWithoutKycReviewerEmployeesInput
    advances?: AdvanceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    userId: string
    employerId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycReviewerId?: string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    advances?: AdvanceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    employer?: EmployerUpdateOneRequiredWithoutEmployeesNestedInput
    kycReviewer?: UserUpdateOneWithoutKycReviewerEmployeesNestedInput
    advances?: AdvanceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    advances?: AdvanceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    userId: string
    employerId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycReviewerId?: string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdvanceCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    repaymentAmount: Decimal | DecimalJsLike | number | string
    requestDate: Date | string
    approvalDate?: Date | string | null
    paymentDate?: Date | string | null
    dueDate: Date | string
    status?: $Enums.EnumAdvancesStatus
    transactionHash?: string | null
    repaymentTransactionHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAdvancesInput
  }

  export type AdvanceUncheckedCreateInput = {
    id?: string
    employeeId: string
    amount: Decimal | DecimalJsLike | number | string
    repaymentAmount: Decimal | DecimalJsLike | number | string
    requestDate: Date | string
    approvalDate?: Date | string | null
    paymentDate?: Date | string | null
    dueDate: Date | string
    status?: $Enums.EnumAdvancesStatus
    transactionHash?: string | null
    repaymentTransactionHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdvanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAdvancesNestedInput
  }

  export type AdvanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdvanceCreateManyInput = {
    id?: string
    employeeId: string
    amount: Decimal | DecimalJsLike | number | string
    repaymentAmount: Decimal | DecimalJsLike | number | string
    requestDate: Date | string
    approvalDate?: Date | string | null
    paymentDate?: Date | string | null
    dueDate: Date | string
    status?: $Enums.EnumAdvancesStatus
    transactionHash?: string | null
    repaymentTransactionHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdvanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdvanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidityPoolCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employer: EmployerCreateNestedOneWithoutLiquidityPoolsInput
  }

  export type LiquidityPoolUncheckedCreateInput = {
    id?: string
    employerId: string
    amount: Decimal | DecimalJsLike | number | string
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiquidityPoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUpdateOneRequiredWithoutLiquidityPoolsNestedInput
  }

  export type LiquidityPoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidityPoolCreateManyInput = {
    id?: string
    employerId: string
    amount: Decimal | DecimalJsLike | number | string
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiquidityPoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidityPoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationCreateInput = {
    id?: string
    targetEmail: string
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
    senderUser: UserCreateNestedOneWithoutSentInvitationsInput
    recipientUser?: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: string
    targetEmail: string
    senderUserId: string
    recipientUserId?: string | null
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderUser?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    recipientUser?: UserUpdateOneWithoutReceivedInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    recipientUserId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationCreateManyInput = {
    id?: string
    targetEmail: string
    senderUserId: string
    recipientUserId?: string | null
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    recipientUserId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoRequestCreateInput = {
    companyName: string
    contactName: string
    email: string
    phone: string
    companySize: number
    message?: string | null
    status?: $Enums.EnumDemoRequestsStatus
    scheduledDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoRequestUncheckedCreateInput = {
    id?: number
    companyName: string
    contactName: string
    email: string
    phone: string
    companySize: number
    message?: string | null
    status?: $Enums.EnumDemoRequestsStatus
    scheduledDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoRequestUpdateInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    companySize?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEnumDemoRequestsStatusFieldUpdateOperationsInput | $Enums.EnumDemoRequestsStatus
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    companySize?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEnumDemoRequestsStatusFieldUpdateOperationsInput | $Enums.EnumDemoRequestsStatus
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoRequestCreateManyInput = {
    id?: number
    companyName: string
    contactName: string
    email: string
    phone: string
    companySize: number
    message?: string | null
    status?: $Enums.EnumDemoRequestsStatus
    scheduledDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoRequestUpdateManyMutationInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    companySize?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEnumDemoRequestsStatusFieldUpdateOperationsInput | $Enums.EnumDemoRequestsStatus
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    companySize?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEnumDemoRequestsStatusFieldUpdateOperationsInput | $Enums.EnumDemoRequestsStatus
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumEnumUsersRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumUsersRole | EnumEnumUsersRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumUsersRoleFilter<$PrismaModel> | $Enums.EnumUsersRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MarketerNullableScalarRelationFilter = {
    is?: MarketerWhereInput | null
    isNot?: MarketerWhereInput | null
  }

  export type EmployerNullableScalarRelationFilter = {
    is?: EmployerWhereInput | null
    isNot?: EmployerWhereInput | null
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type EmployerListRelationFilter = {
    every?: EmployerWhereInput
    some?: EmployerWhereInput
    none?: EmployerWhereInput
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    isWalletVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    isWalletVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    isWalletVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumEnumUsersRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumUsersRole | EnumEnumUsersRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumUsersRoleWithAggregatesFilter<$PrismaModel> | $Enums.EnumUsersRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumUsersRoleFilter<$PrismaModel>
    _max?: NestedEnumEnumUsersRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MarketerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MarketerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type LiquidityPoolListRelationFilter = {
    every?: LiquidityPoolWhereInput
    some?: LiquidityPoolWhereInput
    none?: LiquidityPoolWhereInput
  }

  export type LiquidityPoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketerId?: SortOrder
    companyName?: SortOrder
    registrationDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrder
    verifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployerAvgOrderByAggregateInput = {
    marketerId?: SortOrder
  }

  export type EmployerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketerId?: SortOrder
    companyName?: SortOrder
    registrationDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrder
    verifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketerId?: SortOrder
    companyName?: SortOrder
    registrationDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrder
    verifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployerSumOrderByAggregateInput = {
    marketerId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumEnumEmployeesKycStageFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStage | EnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStageFilter<$PrismaModel> | $Enums.EnumEmployeesKycStage
  }

  export type EnumEnumEmployeesKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStatus | EnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel> | $Enums.EnumEmployeesKycStatus
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type EmployerScalarRelationFilter = {
    is?: EmployerWhereInput
    isNot?: EmployerWhereInput
  }

  export type AdvanceListRelationFilter = {
    every?: AdvanceWhereInput
    some?: AdvanceWhereInput
    none?: AdvanceWhereInput
  }

  export type AdvanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    employerId?: SortOrder
    kycStage?: SortOrder
    kycStatus?: SortOrder
    kycSubmittedAt?: SortOrder
    kycReviewedAt?: SortOrder
    kycReviewerId?: SortOrder
    kycNotes?: SortOrder
    salary?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeAvgOrderByAggregateInput = {
    salary?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    employerId?: SortOrder
    kycStage?: SortOrder
    kycStatus?: SortOrder
    kycSubmittedAt?: SortOrder
    kycReviewedAt?: SortOrder
    kycReviewerId?: SortOrder
    kycNotes?: SortOrder
    salary?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    employerId?: SortOrder
    kycStage?: SortOrder
    kycStatus?: SortOrder
    kycSubmittedAt?: SortOrder
    kycReviewedAt?: SortOrder
    kycReviewerId?: SortOrder
    kycNotes?: SortOrder
    salary?: SortOrder
    registrationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeSumOrderByAggregateInput = {
    salary?: SortOrder
  }

  export type EnumEnumEmployeesKycStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStage | EnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStageWithAggregatesFilter<$PrismaModel> | $Enums.EnumEmployeesKycStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumEmployeesKycStageFilter<$PrismaModel>
    _max?: NestedEnumEnumEmployeesKycStageFilter<$PrismaModel>
  }

  export type EnumEnumEmployeesKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStatus | EnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumEmployeesKycStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumEnumAdvancesStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumAdvancesStatus | EnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumAdvancesStatusFilter<$PrismaModel> | $Enums.EnumAdvancesStatus
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type AdvanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    amount?: SortOrder
    repaymentAmount?: SortOrder
    requestDate?: SortOrder
    approvalDate?: SortOrder
    paymentDate?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrder
    repaymentTransactionHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdvanceAvgOrderByAggregateInput = {
    amount?: SortOrder
    repaymentAmount?: SortOrder
  }

  export type AdvanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    amount?: SortOrder
    repaymentAmount?: SortOrder
    requestDate?: SortOrder
    approvalDate?: SortOrder
    paymentDate?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrder
    repaymentTransactionHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdvanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    amount?: SortOrder
    repaymentAmount?: SortOrder
    requestDate?: SortOrder
    approvalDate?: SortOrder
    paymentDate?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrder
    repaymentTransactionHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdvanceSumOrderByAggregateInput = {
    amount?: SortOrder
    repaymentAmount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumEnumAdvancesStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumAdvancesStatus | EnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumAdvancesStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumAdvancesStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumAdvancesStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumAdvancesStatusFilter<$PrismaModel>
  }

  export type EnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumLiquidityPoolTransactionType | EnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel> | $Enums.EnumLiquidityPoolTransactionType
  }

  export type LiquidityPoolCountOrderByAggregateInput = {
    id?: SortOrder
    employerId?: SortOrder
    amount?: SortOrder
    transactionType?: SortOrder
    transactionHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LiquidityPoolAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type LiquidityPoolMaxOrderByAggregateInput = {
    id?: SortOrder
    employerId?: SortOrder
    amount?: SortOrder
    transactionType?: SortOrder
    transactionHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LiquidityPoolMinOrderByAggregateInput = {
    id?: SortOrder
    employerId?: SortOrder
    amount?: SortOrder
    transactionType?: SortOrder
    transactionHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LiquidityPoolSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumEnumLiquidityPoolTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumLiquidityPoolTransactionType | EnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumLiquidityPoolTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.EnumLiquidityPoolTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel>
  }

  export type EnumEnumInvitationsStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsStatus | EnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsStatusFilter<$PrismaModel> | $Enums.EnumInvitationsStatus
  }

  export type EnumEnumInvitationsRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsRole | EnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsRoleFilter<$PrismaModel> | $Enums.EnumInvitationsRole
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    targetEmail?: SortOrder
    senderUserId?: SortOrder
    recipientUserId?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    targetEmail?: SortOrder
    senderUserId?: SortOrder
    recipientUserId?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    targetEmail?: SortOrder
    senderUserId?: SortOrder
    recipientUserId?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEnumInvitationsStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsStatus | EnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumInvitationsStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumInvitationsStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumInvitationsStatusFilter<$PrismaModel>
  }

  export type EnumEnumInvitationsRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsRole | EnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsRoleWithAggregatesFilter<$PrismaModel> | $Enums.EnumInvitationsRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumInvitationsRoleFilter<$PrismaModel>
    _max?: NestedEnumEnumInvitationsRoleFilter<$PrismaModel>
  }

  export type EnumEnumDemoRequestsStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumDemoRequestsStatus | EnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel> | $Enums.EnumDemoRequestsStatus
  }

  export type DemoRequestCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    companySize?: SortOrder
    message?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemoRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    companySize?: SortOrder
  }

  export type DemoRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    companySize?: SortOrder
    message?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemoRequestMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    companySize?: SortOrder
    message?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemoRequestSumOrderByAggregateInput = {
    id?: SortOrder
    companySize?: SortOrder
  }

  export type EnumEnumDemoRequestsStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumDemoRequestsStatus | EnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumDemoRequestsStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumDemoRequestsStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel>
  }

  export type MarketerCreateNestedOneWithoutUserInput = {
    create?: XOR<MarketerCreateWithoutUserInput, MarketerUncheckedCreateWithoutUserInput>
    connectOrCreate?: MarketerCreateOrConnectWithoutUserInput
    connect?: MarketerWhereUniqueInput
  }

  export type EmployerCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployerCreateWithoutUserInput, EmployerUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutUserInput
    connect?: EmployerWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployerCreateNestedManyWithoutVerifiedByUserInput = {
    create?: XOR<EmployerCreateWithoutVerifiedByUserInput, EmployerUncheckedCreateWithoutVerifiedByUserInput> | EmployerCreateWithoutVerifiedByUserInput[] | EmployerUncheckedCreateWithoutVerifiedByUserInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutVerifiedByUserInput | EmployerCreateOrConnectWithoutVerifiedByUserInput[]
    createMany?: EmployerCreateManyVerifiedByUserInputEnvelope
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
  }

  export type EmployeeCreateNestedManyWithoutKycReviewerInput = {
    create?: XOR<EmployeeCreateWithoutKycReviewerInput, EmployeeUncheckedCreateWithoutKycReviewerInput> | EmployeeCreateWithoutKycReviewerInput[] | EmployeeUncheckedCreateWithoutKycReviewerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutKycReviewerInput | EmployeeCreateOrConnectWithoutKycReviewerInput[]
    createMany?: EmployeeCreateManyKycReviewerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutSenderUserInput = {
    create?: XOR<InvitationCreateWithoutSenderUserInput, InvitationUncheckedCreateWithoutSenderUserInput> | InvitationCreateWithoutSenderUserInput[] | InvitationUncheckedCreateWithoutSenderUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutSenderUserInput | InvitationCreateOrConnectWithoutSenderUserInput[]
    createMany?: InvitationCreateManySenderUserInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutRecipientUserInput = {
    create?: XOR<InvitationCreateWithoutRecipientUserInput, InvitationUncheckedCreateWithoutRecipientUserInput> | InvitationCreateWithoutRecipientUserInput[] | InvitationUncheckedCreateWithoutRecipientUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRecipientUserInput | InvitationCreateOrConnectWithoutRecipientUserInput[]
    createMany?: InvitationCreateManyRecipientUserInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type MarketerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MarketerCreateWithoutUserInput, MarketerUncheckedCreateWithoutUserInput>
    connectOrCreate?: MarketerCreateOrConnectWithoutUserInput
    connect?: MarketerWhereUniqueInput
  }

  export type EmployerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployerCreateWithoutUserInput, EmployerUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutUserInput
    connect?: EmployerWhereUniqueInput
  }

  export type EmployeeUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput = {
    create?: XOR<EmployerCreateWithoutVerifiedByUserInput, EmployerUncheckedCreateWithoutVerifiedByUserInput> | EmployerCreateWithoutVerifiedByUserInput[] | EmployerUncheckedCreateWithoutVerifiedByUserInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutVerifiedByUserInput | EmployerCreateOrConnectWithoutVerifiedByUserInput[]
    createMany?: EmployerCreateManyVerifiedByUserInputEnvelope
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput = {
    create?: XOR<EmployeeCreateWithoutKycReviewerInput, EmployeeUncheckedCreateWithoutKycReviewerInput> | EmployeeCreateWithoutKycReviewerInput[] | EmployeeUncheckedCreateWithoutKycReviewerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutKycReviewerInput | EmployeeCreateOrConnectWithoutKycReviewerInput[]
    createMany?: EmployeeCreateManyKycReviewerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutSenderUserInput = {
    create?: XOR<InvitationCreateWithoutSenderUserInput, InvitationUncheckedCreateWithoutSenderUserInput> | InvitationCreateWithoutSenderUserInput[] | InvitationUncheckedCreateWithoutSenderUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutSenderUserInput | InvitationCreateOrConnectWithoutSenderUserInput[]
    createMany?: InvitationCreateManySenderUserInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutRecipientUserInput = {
    create?: XOR<InvitationCreateWithoutRecipientUserInput, InvitationUncheckedCreateWithoutRecipientUserInput> | InvitationCreateWithoutRecipientUserInput[] | InvitationUncheckedCreateWithoutRecipientUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRecipientUserInput | InvitationCreateOrConnectWithoutRecipientUserInput[]
    createMany?: InvitationCreateManyRecipientUserInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumEnumUsersRoleFieldUpdateOperationsInput = {
    set?: $Enums.EnumUsersRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MarketerUpdateOneWithoutUserNestedInput = {
    create?: XOR<MarketerCreateWithoutUserInput, MarketerUncheckedCreateWithoutUserInput>
    connectOrCreate?: MarketerCreateOrConnectWithoutUserInput
    upsert?: MarketerUpsertWithoutUserInput
    disconnect?: MarketerWhereInput | boolean
    delete?: MarketerWhereInput | boolean
    connect?: MarketerWhereUniqueInput
    update?: XOR<XOR<MarketerUpdateToOneWithWhereWithoutUserInput, MarketerUpdateWithoutUserInput>, MarketerUncheckedUpdateWithoutUserInput>
  }

  export type EmployerUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployerCreateWithoutUserInput, EmployerUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutUserInput
    upsert?: EmployerUpsertWithoutUserInput
    disconnect?: EmployerWhereInput | boolean
    delete?: EmployerWhereInput | boolean
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutUserInput, EmployerUpdateWithoutUserInput>, EmployerUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    upsert?: EmployeeUpsertWithoutUserInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutUserInput, EmployeeUpdateWithoutUserInput>, EmployeeUncheckedUpdateWithoutUserInput>
  }

  export type EmployerUpdateManyWithoutVerifiedByUserNestedInput = {
    create?: XOR<EmployerCreateWithoutVerifiedByUserInput, EmployerUncheckedCreateWithoutVerifiedByUserInput> | EmployerCreateWithoutVerifiedByUserInput[] | EmployerUncheckedCreateWithoutVerifiedByUserInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutVerifiedByUserInput | EmployerCreateOrConnectWithoutVerifiedByUserInput[]
    upsert?: EmployerUpsertWithWhereUniqueWithoutVerifiedByUserInput | EmployerUpsertWithWhereUniqueWithoutVerifiedByUserInput[]
    createMany?: EmployerCreateManyVerifiedByUserInputEnvelope
    set?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    disconnect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    delete?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    update?: EmployerUpdateWithWhereUniqueWithoutVerifiedByUserInput | EmployerUpdateWithWhereUniqueWithoutVerifiedByUserInput[]
    updateMany?: EmployerUpdateManyWithWhereWithoutVerifiedByUserInput | EmployerUpdateManyWithWhereWithoutVerifiedByUserInput[]
    deleteMany?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
  }

  export type EmployeeUpdateManyWithoutKycReviewerNestedInput = {
    create?: XOR<EmployeeCreateWithoutKycReviewerInput, EmployeeUncheckedCreateWithoutKycReviewerInput> | EmployeeCreateWithoutKycReviewerInput[] | EmployeeUncheckedCreateWithoutKycReviewerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutKycReviewerInput | EmployeeCreateOrConnectWithoutKycReviewerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutKycReviewerInput | EmployeeUpsertWithWhereUniqueWithoutKycReviewerInput[]
    createMany?: EmployeeCreateManyKycReviewerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutKycReviewerInput | EmployeeUpdateWithWhereUniqueWithoutKycReviewerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutKycReviewerInput | EmployeeUpdateManyWithWhereWithoutKycReviewerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutSenderUserNestedInput = {
    create?: XOR<InvitationCreateWithoutSenderUserInput, InvitationUncheckedCreateWithoutSenderUserInput> | InvitationCreateWithoutSenderUserInput[] | InvitationUncheckedCreateWithoutSenderUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutSenderUserInput | InvitationCreateOrConnectWithoutSenderUserInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutSenderUserInput | InvitationUpsertWithWhereUniqueWithoutSenderUserInput[]
    createMany?: InvitationCreateManySenderUserInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutSenderUserInput | InvitationUpdateWithWhereUniqueWithoutSenderUserInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutSenderUserInput | InvitationUpdateManyWithWhereWithoutSenderUserInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutRecipientUserNestedInput = {
    create?: XOR<InvitationCreateWithoutRecipientUserInput, InvitationUncheckedCreateWithoutRecipientUserInput> | InvitationCreateWithoutRecipientUserInput[] | InvitationUncheckedCreateWithoutRecipientUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRecipientUserInput | InvitationCreateOrConnectWithoutRecipientUserInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutRecipientUserInput | InvitationUpsertWithWhereUniqueWithoutRecipientUserInput[]
    createMany?: InvitationCreateManyRecipientUserInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutRecipientUserInput | InvitationUpdateWithWhereUniqueWithoutRecipientUserInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutRecipientUserInput | InvitationUpdateManyWithWhereWithoutRecipientUserInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type MarketerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MarketerCreateWithoutUserInput, MarketerUncheckedCreateWithoutUserInput>
    connectOrCreate?: MarketerCreateOrConnectWithoutUserInput
    upsert?: MarketerUpsertWithoutUserInput
    disconnect?: MarketerWhereInput | boolean
    delete?: MarketerWhereInput | boolean
    connect?: MarketerWhereUniqueInput
    update?: XOR<XOR<MarketerUpdateToOneWithWhereWithoutUserInput, MarketerUpdateWithoutUserInput>, MarketerUncheckedUpdateWithoutUserInput>
  }

  export type EmployerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployerCreateWithoutUserInput, EmployerUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutUserInput
    upsert?: EmployerUpsertWithoutUserInput
    disconnect?: EmployerWhereInput | boolean
    delete?: EmployerWhereInput | boolean
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutUserInput, EmployerUpdateWithoutUserInput>, EmployerUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    upsert?: EmployeeUpsertWithoutUserInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutUserInput, EmployeeUpdateWithoutUserInput>, EmployeeUncheckedUpdateWithoutUserInput>
  }

  export type EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput = {
    create?: XOR<EmployerCreateWithoutVerifiedByUserInput, EmployerUncheckedCreateWithoutVerifiedByUserInput> | EmployerCreateWithoutVerifiedByUserInput[] | EmployerUncheckedCreateWithoutVerifiedByUserInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutVerifiedByUserInput | EmployerCreateOrConnectWithoutVerifiedByUserInput[]
    upsert?: EmployerUpsertWithWhereUniqueWithoutVerifiedByUserInput | EmployerUpsertWithWhereUniqueWithoutVerifiedByUserInput[]
    createMany?: EmployerCreateManyVerifiedByUserInputEnvelope
    set?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    disconnect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    delete?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    update?: EmployerUpdateWithWhereUniqueWithoutVerifiedByUserInput | EmployerUpdateWithWhereUniqueWithoutVerifiedByUserInput[]
    updateMany?: EmployerUpdateManyWithWhereWithoutVerifiedByUserInput | EmployerUpdateManyWithWhereWithoutVerifiedByUserInput[]
    deleteMany?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput = {
    create?: XOR<EmployeeCreateWithoutKycReviewerInput, EmployeeUncheckedCreateWithoutKycReviewerInput> | EmployeeCreateWithoutKycReviewerInput[] | EmployeeUncheckedCreateWithoutKycReviewerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutKycReviewerInput | EmployeeCreateOrConnectWithoutKycReviewerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutKycReviewerInput | EmployeeUpsertWithWhereUniqueWithoutKycReviewerInput[]
    createMany?: EmployeeCreateManyKycReviewerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutKycReviewerInput | EmployeeUpdateWithWhereUniqueWithoutKycReviewerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutKycReviewerInput | EmployeeUpdateManyWithWhereWithoutKycReviewerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutSenderUserNestedInput = {
    create?: XOR<InvitationCreateWithoutSenderUserInput, InvitationUncheckedCreateWithoutSenderUserInput> | InvitationCreateWithoutSenderUserInput[] | InvitationUncheckedCreateWithoutSenderUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutSenderUserInput | InvitationCreateOrConnectWithoutSenderUserInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutSenderUserInput | InvitationUpsertWithWhereUniqueWithoutSenderUserInput[]
    createMany?: InvitationCreateManySenderUserInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutSenderUserInput | InvitationUpdateWithWhereUniqueWithoutSenderUserInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutSenderUserInput | InvitationUpdateManyWithWhereWithoutSenderUserInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput = {
    create?: XOR<InvitationCreateWithoutRecipientUserInput, InvitationUncheckedCreateWithoutRecipientUserInput> | InvitationCreateWithoutRecipientUserInput[] | InvitationUncheckedCreateWithoutRecipientUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRecipientUserInput | InvitationCreateOrConnectWithoutRecipientUserInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutRecipientUserInput | InvitationUpsertWithWhereUniqueWithoutRecipientUserInput[]
    createMany?: InvitationCreateManyRecipientUserInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutRecipientUserInput | InvitationUpdateWithWhereUniqueWithoutRecipientUserInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutRecipientUserInput | InvitationUpdateManyWithWhereWithoutRecipientUserInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMarketerInput = {
    create?: XOR<UserCreateWithoutMarketerInput, UserUncheckedCreateWithoutMarketerInput>
    connectOrCreate?: UserCreateOrConnectWithoutMarketerInput
    connect?: UserWhereUniqueInput
  }

  export type EmployerCreateNestedManyWithoutMarketerInput = {
    create?: XOR<EmployerCreateWithoutMarketerInput, EmployerUncheckedCreateWithoutMarketerInput> | EmployerCreateWithoutMarketerInput[] | EmployerUncheckedCreateWithoutMarketerInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutMarketerInput | EmployerCreateOrConnectWithoutMarketerInput[]
    createMany?: EmployerCreateManyMarketerInputEnvelope
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
  }

  export type EmployerUncheckedCreateNestedManyWithoutMarketerInput = {
    create?: XOR<EmployerCreateWithoutMarketerInput, EmployerUncheckedCreateWithoutMarketerInput> | EmployerCreateWithoutMarketerInput[] | EmployerUncheckedCreateWithoutMarketerInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutMarketerInput | EmployerCreateOrConnectWithoutMarketerInput[]
    createMany?: EmployerCreateManyMarketerInputEnvelope
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMarketerNestedInput = {
    create?: XOR<UserCreateWithoutMarketerInput, UserUncheckedCreateWithoutMarketerInput>
    connectOrCreate?: UserCreateOrConnectWithoutMarketerInput
    upsert?: UserUpsertWithoutMarketerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMarketerInput, UserUpdateWithoutMarketerInput>, UserUncheckedUpdateWithoutMarketerInput>
  }

  export type EmployerUpdateManyWithoutMarketerNestedInput = {
    create?: XOR<EmployerCreateWithoutMarketerInput, EmployerUncheckedCreateWithoutMarketerInput> | EmployerCreateWithoutMarketerInput[] | EmployerUncheckedCreateWithoutMarketerInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutMarketerInput | EmployerCreateOrConnectWithoutMarketerInput[]
    upsert?: EmployerUpsertWithWhereUniqueWithoutMarketerInput | EmployerUpsertWithWhereUniqueWithoutMarketerInput[]
    createMany?: EmployerCreateManyMarketerInputEnvelope
    set?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    disconnect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    delete?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    update?: EmployerUpdateWithWhereUniqueWithoutMarketerInput | EmployerUpdateWithWhereUniqueWithoutMarketerInput[]
    updateMany?: EmployerUpdateManyWithWhereWithoutMarketerInput | EmployerUpdateManyWithWhereWithoutMarketerInput[]
    deleteMany?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployerUncheckedUpdateManyWithoutMarketerNestedInput = {
    create?: XOR<EmployerCreateWithoutMarketerInput, EmployerUncheckedCreateWithoutMarketerInput> | EmployerCreateWithoutMarketerInput[] | EmployerUncheckedCreateWithoutMarketerInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutMarketerInput | EmployerCreateOrConnectWithoutMarketerInput[]
    upsert?: EmployerUpsertWithWhereUniqueWithoutMarketerInput | EmployerUpsertWithWhereUniqueWithoutMarketerInput[]
    createMany?: EmployerCreateManyMarketerInputEnvelope
    set?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    disconnect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    delete?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    update?: EmployerUpdateWithWhereUniqueWithoutMarketerInput | EmployerUpdateWithWhereUniqueWithoutMarketerInput[]
    updateMany?: EmployerUpdateManyWithWhereWithoutMarketerInput | EmployerUpdateManyWithWhereWithoutMarketerInput[]
    deleteMany?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmployerInput = {
    create?: XOR<UserCreateWithoutEmployerInput, UserUncheckedCreateWithoutEmployerInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployerInput
    connect?: UserWhereUniqueInput
  }

  export type MarketerCreateNestedOneWithoutEmployersInput = {
    create?: XOR<MarketerCreateWithoutEmployersInput, MarketerUncheckedCreateWithoutEmployersInput>
    connectOrCreate?: MarketerCreateOrConnectWithoutEmployersInput
    connect?: MarketerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerifiedEmployersInput = {
    create?: XOR<UserCreateWithoutVerifiedEmployersInput, UserUncheckedCreateWithoutVerifiedEmployersInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedEmployersInput
    connect?: UserWhereUniqueInput
  }

  export type EmployeeCreateNestedManyWithoutEmployerInput = {
    create?: XOR<EmployeeCreateWithoutEmployerInput, EmployeeUncheckedCreateWithoutEmployerInput> | EmployeeCreateWithoutEmployerInput[] | EmployeeUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployerInput | EmployeeCreateOrConnectWithoutEmployerInput[]
    createMany?: EmployeeCreateManyEmployerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type LiquidityPoolCreateNestedManyWithoutEmployerInput = {
    create?: XOR<LiquidityPoolCreateWithoutEmployerInput, LiquidityPoolUncheckedCreateWithoutEmployerInput> | LiquidityPoolCreateWithoutEmployerInput[] | LiquidityPoolUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: LiquidityPoolCreateOrConnectWithoutEmployerInput | LiquidityPoolCreateOrConnectWithoutEmployerInput[]
    createMany?: LiquidityPoolCreateManyEmployerInputEnvelope
    connect?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutEmployerInput = {
    create?: XOR<EmployeeCreateWithoutEmployerInput, EmployeeUncheckedCreateWithoutEmployerInput> | EmployeeCreateWithoutEmployerInput[] | EmployeeUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployerInput | EmployeeCreateOrConnectWithoutEmployerInput[]
    createMany?: EmployeeCreateManyEmployerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type LiquidityPoolUncheckedCreateNestedManyWithoutEmployerInput = {
    create?: XOR<LiquidityPoolCreateWithoutEmployerInput, LiquidityPoolUncheckedCreateWithoutEmployerInput> | LiquidityPoolCreateWithoutEmployerInput[] | LiquidityPoolUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: LiquidityPoolCreateOrConnectWithoutEmployerInput | LiquidityPoolCreateOrConnectWithoutEmployerInput[]
    createMany?: LiquidityPoolCreateManyEmployerInputEnvelope
    connect?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutEmployerNestedInput = {
    create?: XOR<UserCreateWithoutEmployerInput, UserUncheckedCreateWithoutEmployerInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployerInput
    upsert?: UserUpsertWithoutEmployerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmployerInput, UserUpdateWithoutEmployerInput>, UserUncheckedUpdateWithoutEmployerInput>
  }

  export type MarketerUpdateOneWithoutEmployersNestedInput = {
    create?: XOR<MarketerCreateWithoutEmployersInput, MarketerUncheckedCreateWithoutEmployersInput>
    connectOrCreate?: MarketerCreateOrConnectWithoutEmployersInput
    upsert?: MarketerUpsertWithoutEmployersInput
    disconnect?: MarketerWhereInput | boolean
    delete?: MarketerWhereInput | boolean
    connect?: MarketerWhereUniqueInput
    update?: XOR<XOR<MarketerUpdateToOneWithWhereWithoutEmployersInput, MarketerUpdateWithoutEmployersInput>, MarketerUncheckedUpdateWithoutEmployersInput>
  }

  export type UserUpdateOneWithoutVerifiedEmployersNestedInput = {
    create?: XOR<UserCreateWithoutVerifiedEmployersInput, UserUncheckedCreateWithoutVerifiedEmployersInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedEmployersInput
    upsert?: UserUpsertWithoutVerifiedEmployersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerifiedEmployersInput, UserUpdateWithoutVerifiedEmployersInput>, UserUncheckedUpdateWithoutVerifiedEmployersInput>
  }

  export type EmployeeUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmployerInput, EmployeeUncheckedCreateWithoutEmployerInput> | EmployeeCreateWithoutEmployerInput[] | EmployeeUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployerInput | EmployeeCreateOrConnectWithoutEmployerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutEmployerInput | EmployeeUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: EmployeeCreateManyEmployerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutEmployerInput | EmployeeUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutEmployerInput | EmployeeUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type LiquidityPoolUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<LiquidityPoolCreateWithoutEmployerInput, LiquidityPoolUncheckedCreateWithoutEmployerInput> | LiquidityPoolCreateWithoutEmployerInput[] | LiquidityPoolUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: LiquidityPoolCreateOrConnectWithoutEmployerInput | LiquidityPoolCreateOrConnectWithoutEmployerInput[]
    upsert?: LiquidityPoolUpsertWithWhereUniqueWithoutEmployerInput | LiquidityPoolUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: LiquidityPoolCreateManyEmployerInputEnvelope
    set?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    disconnect?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    delete?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    connect?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    update?: LiquidityPoolUpdateWithWhereUniqueWithoutEmployerInput | LiquidityPoolUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: LiquidityPoolUpdateManyWithWhereWithoutEmployerInput | LiquidityPoolUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: LiquidityPoolScalarWhereInput | LiquidityPoolScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUncheckedUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmployerInput, EmployeeUncheckedCreateWithoutEmployerInput> | EmployeeCreateWithoutEmployerInput[] | EmployeeUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployerInput | EmployeeCreateOrConnectWithoutEmployerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutEmployerInput | EmployeeUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: EmployeeCreateManyEmployerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutEmployerInput | EmployeeUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutEmployerInput | EmployeeUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type LiquidityPoolUncheckedUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<LiquidityPoolCreateWithoutEmployerInput, LiquidityPoolUncheckedCreateWithoutEmployerInput> | LiquidityPoolCreateWithoutEmployerInput[] | LiquidityPoolUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: LiquidityPoolCreateOrConnectWithoutEmployerInput | LiquidityPoolCreateOrConnectWithoutEmployerInput[]
    upsert?: LiquidityPoolUpsertWithWhereUniqueWithoutEmployerInput | LiquidityPoolUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: LiquidityPoolCreateManyEmployerInputEnvelope
    set?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    disconnect?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    delete?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    connect?: LiquidityPoolWhereUniqueInput | LiquidityPoolWhereUniqueInput[]
    update?: LiquidityPoolUpdateWithWhereUniqueWithoutEmployerInput | LiquidityPoolUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: LiquidityPoolUpdateManyWithWhereWithoutEmployerInput | LiquidityPoolUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: LiquidityPoolScalarWhereInput | LiquidityPoolScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeInput
    connect?: UserWhereUniqueInput
  }

  export type EmployerCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<EmployerCreateWithoutEmployeesInput, EmployerUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutEmployeesInput
    connect?: EmployerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutKycReviewerEmployeesInput = {
    create?: XOR<UserCreateWithoutKycReviewerEmployeesInput, UserUncheckedCreateWithoutKycReviewerEmployeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycReviewerEmployeesInput
    connect?: UserWhereUniqueInput
  }

  export type AdvanceCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AdvanceCreateWithoutEmployeeInput, AdvanceUncheckedCreateWithoutEmployeeInput> | AdvanceCreateWithoutEmployeeInput[] | AdvanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AdvanceCreateOrConnectWithoutEmployeeInput | AdvanceCreateOrConnectWithoutEmployeeInput[]
    createMany?: AdvanceCreateManyEmployeeInputEnvelope
    connect?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
  }

  export type AdvanceUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AdvanceCreateWithoutEmployeeInput, AdvanceUncheckedCreateWithoutEmployeeInput> | AdvanceCreateWithoutEmployeeInput[] | AdvanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AdvanceCreateOrConnectWithoutEmployeeInput | AdvanceCreateOrConnectWithoutEmployeeInput[]
    createMany?: AdvanceCreateManyEmployeeInputEnvelope
    connect?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
  }

  export type EnumEnumEmployeesKycStageFieldUpdateOperationsInput = {
    set?: $Enums.EnumEmployeesKycStage
  }

  export type EnumEnumEmployeesKycStatusFieldUpdateOperationsInput = {
    set?: $Enums.EnumEmployeesKycStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutEmployeeNestedInput = {
    create?: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeInput
    upsert?: UserUpsertWithoutEmployeeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmployeeInput, UserUpdateWithoutEmployeeInput>, UserUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployerUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<EmployerCreateWithoutEmployeesInput, EmployerUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutEmployeesInput
    upsert?: EmployerUpsertWithoutEmployeesInput
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutEmployeesInput, EmployerUpdateWithoutEmployeesInput>, EmployerUncheckedUpdateWithoutEmployeesInput>
  }

  export type UserUpdateOneWithoutKycReviewerEmployeesNestedInput = {
    create?: XOR<UserCreateWithoutKycReviewerEmployeesInput, UserUncheckedCreateWithoutKycReviewerEmployeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycReviewerEmployeesInput
    upsert?: UserUpsertWithoutKycReviewerEmployeesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKycReviewerEmployeesInput, UserUpdateWithoutKycReviewerEmployeesInput>, UserUncheckedUpdateWithoutKycReviewerEmployeesInput>
  }

  export type AdvanceUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AdvanceCreateWithoutEmployeeInput, AdvanceUncheckedCreateWithoutEmployeeInput> | AdvanceCreateWithoutEmployeeInput[] | AdvanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AdvanceCreateOrConnectWithoutEmployeeInput | AdvanceCreateOrConnectWithoutEmployeeInput[]
    upsert?: AdvanceUpsertWithWhereUniqueWithoutEmployeeInput | AdvanceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AdvanceCreateManyEmployeeInputEnvelope
    set?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    disconnect?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    delete?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    connect?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    update?: AdvanceUpdateWithWhereUniqueWithoutEmployeeInput | AdvanceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AdvanceUpdateManyWithWhereWithoutEmployeeInput | AdvanceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AdvanceScalarWhereInput | AdvanceScalarWhereInput[]
  }

  export type AdvanceUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AdvanceCreateWithoutEmployeeInput, AdvanceUncheckedCreateWithoutEmployeeInput> | AdvanceCreateWithoutEmployeeInput[] | AdvanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AdvanceCreateOrConnectWithoutEmployeeInput | AdvanceCreateOrConnectWithoutEmployeeInput[]
    upsert?: AdvanceUpsertWithWhereUniqueWithoutEmployeeInput | AdvanceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AdvanceCreateManyEmployeeInputEnvelope
    set?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    disconnect?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    delete?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    connect?: AdvanceWhereUniqueInput | AdvanceWhereUniqueInput[]
    update?: AdvanceUpdateWithWhereUniqueWithoutEmployeeInput | AdvanceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AdvanceUpdateManyWithWhereWithoutEmployeeInput | AdvanceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AdvanceScalarWhereInput | AdvanceScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutAdvancesInput = {
    create?: XOR<EmployeeCreateWithoutAdvancesInput, EmployeeUncheckedCreateWithoutAdvancesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAdvancesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumEnumAdvancesStatusFieldUpdateOperationsInput = {
    set?: $Enums.EnumAdvancesStatus
  }

  export type EmployeeUpdateOneRequiredWithoutAdvancesNestedInput = {
    create?: XOR<EmployeeCreateWithoutAdvancesInput, EmployeeUncheckedCreateWithoutAdvancesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAdvancesInput
    upsert?: EmployeeUpsertWithoutAdvancesInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAdvancesInput, EmployeeUpdateWithoutAdvancesInput>, EmployeeUncheckedUpdateWithoutAdvancesInput>
  }

  export type EmployerCreateNestedOneWithoutLiquidityPoolsInput = {
    create?: XOR<EmployerCreateWithoutLiquidityPoolsInput, EmployerUncheckedCreateWithoutLiquidityPoolsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutLiquidityPoolsInput
    connect?: EmployerWhereUniqueInput
  }

  export type EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.EnumLiquidityPoolTransactionType
  }

  export type EmployerUpdateOneRequiredWithoutLiquidityPoolsNestedInput = {
    create?: XOR<EmployerCreateWithoutLiquidityPoolsInput, EmployerUncheckedCreateWithoutLiquidityPoolsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutLiquidityPoolsInput
    upsert?: EmployerUpsertWithoutLiquidityPoolsInput
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutLiquidityPoolsInput, EmployerUpdateWithoutLiquidityPoolsInput>, EmployerUncheckedUpdateWithoutLiquidityPoolsInput>
  }

  export type UserCreateNestedOneWithoutSentInvitationsInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedInvitationsInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumEnumInvitationsStatusFieldUpdateOperationsInput = {
    set?: $Enums.EnumInvitationsStatus
  }

  export type EnumEnumInvitationsRoleFieldUpdateOperationsInput = {
    set?: $Enums.EnumInvitationsRole
  }

  export type UserUpdateOneRequiredWithoutSentInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    upsert?: UserUpsertWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentInvitationsInput, UserUpdateWithoutSentInvitationsInput>, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateOneWithoutReceivedInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    upsert?: UserUpsertWithoutReceivedInvitationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedInvitationsInput, UserUpdateWithoutReceivedInvitationsInput>, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type EnumEnumDemoRequestsStatusFieldUpdateOperationsInput = {
    set?: $Enums.EnumDemoRequestsStatus
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumEnumUsersRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumUsersRole | EnumEnumUsersRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumUsersRoleFilter<$PrismaModel> | $Enums.EnumUsersRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumEnumUsersRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumUsersRole | EnumEnumUsersRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumUsersRole[] | ListEnumEnumUsersRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumUsersRoleWithAggregatesFilter<$PrismaModel> | $Enums.EnumUsersRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumUsersRoleFilter<$PrismaModel>
    _max?: NestedEnumEnumUsersRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumEnumEmployeesKycStageFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStage | EnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStageFilter<$PrismaModel> | $Enums.EnumEmployeesKycStage
  }

  export type NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStatus | EnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel> | $Enums.EnumEmployeesKycStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumEnumEmployeesKycStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStage | EnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStage[] | ListEnumEnumEmployeesKycStageFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStageWithAggregatesFilter<$PrismaModel> | $Enums.EnumEmployeesKycStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumEmployeesKycStageFilter<$PrismaModel>
    _max?: NestedEnumEnumEmployeesKycStageFilter<$PrismaModel>
  }

  export type NestedEnumEnumEmployeesKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumEmployeesKycStatus | EnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumEmployeesKycStatus[] | ListEnumEnumEmployeesKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumEmployeesKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumEmployeesKycStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumEmployeesKycStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumEnumAdvancesStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumAdvancesStatus | EnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumAdvancesStatusFilter<$PrismaModel> | $Enums.EnumAdvancesStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumEnumAdvancesStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumAdvancesStatus | EnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumAdvancesStatus[] | ListEnumEnumAdvancesStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumAdvancesStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumAdvancesStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumAdvancesStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumAdvancesStatusFilter<$PrismaModel>
  }

  export type NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumLiquidityPoolTransactionType | EnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel> | $Enums.EnumLiquidityPoolTransactionType
  }

  export type NestedEnumEnumLiquidityPoolTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumLiquidityPoolTransactionType | EnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumLiquidityPoolTransactionType[] | ListEnumEnumLiquidityPoolTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumLiquidityPoolTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.EnumLiquidityPoolTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumEnumLiquidityPoolTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumEnumInvitationsStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsStatus | EnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsStatusFilter<$PrismaModel> | $Enums.EnumInvitationsStatus
  }

  export type NestedEnumEnumInvitationsRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsRole | EnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsRoleFilter<$PrismaModel> | $Enums.EnumInvitationsRole
  }

  export type NestedEnumEnumInvitationsStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsStatus | EnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsStatus[] | ListEnumEnumInvitationsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumInvitationsStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumInvitationsStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumInvitationsStatusFilter<$PrismaModel>
  }

  export type NestedEnumEnumInvitationsRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumInvitationsRole | EnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumInvitationsRole[] | ListEnumEnumInvitationsRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumInvitationsRoleWithAggregatesFilter<$PrismaModel> | $Enums.EnumInvitationsRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumInvitationsRoleFilter<$PrismaModel>
    _max?: NestedEnumEnumInvitationsRoleFilter<$PrismaModel>
  }

  export type NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumDemoRequestsStatus | EnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel> | $Enums.EnumDemoRequestsStatus
  }

  export type NestedEnumEnumDemoRequestsStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnumDemoRequestsStatus | EnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EnumDemoRequestsStatus[] | ListEnumEnumDemoRequestsStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEnumDemoRequestsStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnumDemoRequestsStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel>
    _max?: NestedEnumEnumDemoRequestsStatusFilter<$PrismaModel>
  }

  export type MarketerCreateWithoutUserInput = {
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employers?: EmployerCreateNestedManyWithoutMarketerInput
  }

  export type MarketerUncheckedCreateWithoutUserInput = {
    id?: number
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employers?: EmployerUncheckedCreateNestedManyWithoutMarketerInput
  }

  export type MarketerCreateOrConnectWithoutUserInput = {
    where: MarketerWhereUniqueInput
    create: XOR<MarketerCreateWithoutUserInput, MarketerUncheckedCreateWithoutUserInput>
  }

  export type EmployerCreateWithoutUserInput = {
    id?: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutEmployersInput
    verifiedByUser?: UserCreateNestedOneWithoutVerifiedEmployersInput
    employees?: EmployeeCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutUserInput = {
    id?: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutUserInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutUserInput, EmployerUncheckedCreateWithoutUserInput>
  }

  export type EmployeeCreateWithoutUserInput = {
    id?: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employer: EmployerCreateNestedOneWithoutEmployeesInput
    kycReviewer?: UserCreateNestedOneWithoutKycReviewerEmployeesInput
    advances?: AdvanceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutUserInput = {
    id?: string
    employerId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycReviewerId?: string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    advances?: AdvanceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutUserInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
  }

  export type EmployerCreateWithoutVerifiedByUserInput = {
    id?: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployerInput
    marketer?: MarketerCreateNestedOneWithoutEmployersInput
    employees?: EmployeeCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutVerifiedByUserInput = {
    id?: string
    userId: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutVerifiedByUserInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutVerifiedByUserInput, EmployerUncheckedCreateWithoutVerifiedByUserInput>
  }

  export type EmployerCreateManyVerifiedByUserInputEnvelope = {
    data: EmployerCreateManyVerifiedByUserInput | EmployerCreateManyVerifiedByUserInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeCreateWithoutKycReviewerInput = {
    id?: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    employer: EmployerCreateNestedOneWithoutEmployeesInput
    advances?: AdvanceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutKycReviewerInput = {
    id?: string
    userId: string
    employerId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    advances?: AdvanceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutKycReviewerInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutKycReviewerInput, EmployeeUncheckedCreateWithoutKycReviewerInput>
  }

  export type EmployeeCreateManyKycReviewerInputEnvelope = {
    data: EmployeeCreateManyKycReviewerInput | EmployeeCreateManyKycReviewerInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutSenderUserInput = {
    id?: string
    targetEmail: string
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
    recipientUser?: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutSenderUserInput = {
    id?: string
    targetEmail: string
    recipientUserId?: string | null
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationCreateOrConnectWithoutSenderUserInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutSenderUserInput, InvitationUncheckedCreateWithoutSenderUserInput>
  }

  export type InvitationCreateManySenderUserInputEnvelope = {
    data: InvitationCreateManySenderUserInput | InvitationCreateManySenderUserInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutRecipientUserInput = {
    id?: string
    targetEmail: string
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
    senderUser: UserCreateNestedOneWithoutSentInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutRecipientUserInput = {
    id?: string
    targetEmail: string
    senderUserId: string
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationCreateOrConnectWithoutRecipientUserInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutRecipientUserInput, InvitationUncheckedCreateWithoutRecipientUserInput>
  }

  export type InvitationCreateManyRecipientUserInputEnvelope = {
    data: InvitationCreateManyRecipientUserInput | InvitationCreateManyRecipientUserInput[]
    skipDuplicates?: boolean
  }

  export type MarketerUpsertWithoutUserInput = {
    update: XOR<MarketerUpdateWithoutUserInput, MarketerUncheckedUpdateWithoutUserInput>
    create: XOR<MarketerCreateWithoutUserInput, MarketerUncheckedCreateWithoutUserInput>
    where?: MarketerWhereInput
  }

  export type MarketerUpdateToOneWithWhereWithoutUserInput = {
    where?: MarketerWhereInput
    data: XOR<MarketerUpdateWithoutUserInput, MarketerUncheckedUpdateWithoutUserInput>
  }

  export type MarketerUpdateWithoutUserInput = {
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employers?: EmployerUpdateManyWithoutMarketerNestedInput
  }

  export type MarketerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employers?: EmployerUncheckedUpdateManyWithoutMarketerNestedInput
  }

  export type EmployerUpsertWithoutUserInput = {
    update: XOR<EmployerUpdateWithoutUserInput, EmployerUncheckedUpdateWithoutUserInput>
    create: XOR<EmployerCreateWithoutUserInput, EmployerUncheckedCreateWithoutUserInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutUserInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutUserInput, EmployerUncheckedUpdateWithoutUserInput>
  }

  export type EmployerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutEmployersNestedInput
    verifiedByUser?: UserUpdateOneWithoutVerifiedEmployersNestedInput
    employees?: EmployeeUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployeeUpsertWithoutUserInput = {
    update: XOR<EmployeeUpdateWithoutUserInput, EmployeeUncheckedUpdateWithoutUserInput>
    create: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutUserInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutUserInput, EmployeeUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUpdateOneRequiredWithoutEmployeesNestedInput
    kycReviewer?: UserUpdateOneWithoutKycReviewerEmployeesNestedInput
    advances?: AdvanceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    advances?: AdvanceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployerUpsertWithWhereUniqueWithoutVerifiedByUserInput = {
    where: EmployerWhereUniqueInput
    update: XOR<EmployerUpdateWithoutVerifiedByUserInput, EmployerUncheckedUpdateWithoutVerifiedByUserInput>
    create: XOR<EmployerCreateWithoutVerifiedByUserInput, EmployerUncheckedCreateWithoutVerifiedByUserInput>
  }

  export type EmployerUpdateWithWhereUniqueWithoutVerifiedByUserInput = {
    where: EmployerWhereUniqueInput
    data: XOR<EmployerUpdateWithoutVerifiedByUserInput, EmployerUncheckedUpdateWithoutVerifiedByUserInput>
  }

  export type EmployerUpdateManyWithWhereWithoutVerifiedByUserInput = {
    where: EmployerScalarWhereInput
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyWithoutVerifiedByUserInput>
  }

  export type EmployerScalarWhereInput = {
    AND?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
    OR?: EmployerScalarWhereInput[]
    NOT?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
    id?: UuidFilter<"Employer"> | string
    userId?: UuidFilter<"Employer"> | string
    marketerId?: IntNullableFilter<"Employer"> | number | null
    companyName?: StringFilter<"Employer"> | string
    registrationDate?: DateTimeFilter<"Employer"> | Date | string
    isVerified?: BoolFilter<"Employer"> | boolean
    verificationDate?: DateTimeNullableFilter<"Employer"> | Date | string | null
    verifiedBy?: UuidNullableFilter<"Employer"> | string | null
    createdAt?: DateTimeFilter<"Employer"> | Date | string
    updatedAt?: DateTimeFilter<"Employer"> | Date | string
  }

  export type EmployeeUpsertWithWhereUniqueWithoutKycReviewerInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutKycReviewerInput, EmployeeUncheckedUpdateWithoutKycReviewerInput>
    create: XOR<EmployeeCreateWithoutKycReviewerInput, EmployeeUncheckedCreateWithoutKycReviewerInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutKycReviewerInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutKycReviewerInput, EmployeeUncheckedUpdateWithoutKycReviewerInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutKycReviewerInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutKycReviewerInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: UuidFilter<"Employee"> | string
    userId?: UuidFilter<"Employee"> | string
    employerId?: UuidFilter<"Employee"> | string
    kycStage?: EnumEnumEmployeesKycStageFilter<"Employee"> | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFilter<"Employee"> | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: DateTimeNullableFilter<"Employee"> | Date | string | null
    kycReviewedAt?: DateTimeNullableFilter<"Employee"> | Date | string | null
    kycReviewerId?: UuidNullableFilter<"Employee"> | string | null
    kycNotes?: StringNullableFilter<"Employee"> | string | null
    salary?: DecimalNullableFilter<"Employee"> | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFilter<"Employee"> | Date | string
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
  }

  export type InvitationUpsertWithWhereUniqueWithoutSenderUserInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutSenderUserInput, InvitationUncheckedUpdateWithoutSenderUserInput>
    create: XOR<InvitationCreateWithoutSenderUserInput, InvitationUncheckedCreateWithoutSenderUserInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutSenderUserInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutSenderUserInput, InvitationUncheckedUpdateWithoutSenderUserInput>
  }

  export type InvitationUpdateManyWithWhereWithoutSenderUserInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutSenderUserInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: UuidFilter<"Invitation"> | string
    targetEmail?: StringFilter<"Invitation"> | string
    senderUserId?: UuidFilter<"Invitation"> | string
    recipientUserId?: UuidNullableFilter<"Invitation"> | string | null
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    status?: EnumEnumInvitationsStatusFilter<"Invitation"> | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFilter<"Invitation"> | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeFilter<"Invitation"> | Date | string
  }

  export type InvitationUpsertWithWhereUniqueWithoutRecipientUserInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutRecipientUserInput, InvitationUncheckedUpdateWithoutRecipientUserInput>
    create: XOR<InvitationCreateWithoutRecipientUserInput, InvitationUncheckedCreateWithoutRecipientUserInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutRecipientUserInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutRecipientUserInput, InvitationUncheckedUpdateWithoutRecipientUserInput>
  }

  export type InvitationUpdateManyWithWhereWithoutRecipientUserInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutRecipientUserInput>
  }

  export type UserCreateWithoutMarketerInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employer?: EmployerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateWithoutMarketerInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserCreateOrConnectWithoutMarketerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMarketerInput, UserUncheckedCreateWithoutMarketerInput>
  }

  export type EmployerCreateWithoutMarketerInput = {
    id?: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployerInput
    verifiedByUser?: UserCreateNestedOneWithoutVerifiedEmployersInput
    employees?: EmployeeCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutMarketerInput = {
    id?: string
    userId: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutEmployerInput
    liquidityPools?: LiquidityPoolUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutMarketerInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutMarketerInput, EmployerUncheckedCreateWithoutMarketerInput>
  }

  export type EmployerCreateManyMarketerInputEnvelope = {
    data: EmployerCreateManyMarketerInput | EmployerCreateManyMarketerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMarketerInput = {
    update: XOR<UserUpdateWithoutMarketerInput, UserUncheckedUpdateWithoutMarketerInput>
    create: XOR<UserCreateWithoutMarketerInput, UserUncheckedCreateWithoutMarketerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMarketerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMarketerInput, UserUncheckedUpdateWithoutMarketerInput>
  }

  export type UserUpdateWithoutMarketerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMarketerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type EmployerUpsertWithWhereUniqueWithoutMarketerInput = {
    where: EmployerWhereUniqueInput
    update: XOR<EmployerUpdateWithoutMarketerInput, EmployerUncheckedUpdateWithoutMarketerInput>
    create: XOR<EmployerCreateWithoutMarketerInput, EmployerUncheckedCreateWithoutMarketerInput>
  }

  export type EmployerUpdateWithWhereUniqueWithoutMarketerInput = {
    where: EmployerWhereUniqueInput
    data: XOR<EmployerUpdateWithoutMarketerInput, EmployerUncheckedUpdateWithoutMarketerInput>
  }

  export type EmployerUpdateManyWithWhereWithoutMarketerInput = {
    where: EmployerScalarWhereInput
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyWithoutMarketerInput>
  }

  export type UserCreateWithoutEmployerInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateWithoutEmployerInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserCreateOrConnectWithoutEmployerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmployerInput, UserUncheckedCreateWithoutEmployerInput>
  }

  export type MarketerCreateWithoutEmployersInput = {
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMarketerInput
  }

  export type MarketerUncheckedCreateWithoutEmployersInput = {
    id?: number
    userId: string
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarketerCreateOrConnectWithoutEmployersInput = {
    where: MarketerWhereUniqueInput
    create: XOR<MarketerCreateWithoutEmployersInput, MarketerUncheckedCreateWithoutEmployersInput>
  }

  export type UserCreateWithoutVerifiedEmployersInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employer?: EmployerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateWithoutVerifiedEmployersInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserCreateOrConnectWithoutVerifiedEmployersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerifiedEmployersInput, UserUncheckedCreateWithoutVerifiedEmployersInput>
  }

  export type EmployeeCreateWithoutEmployerInput = {
    id?: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    kycReviewer?: UserCreateNestedOneWithoutKycReviewerEmployeesInput
    advances?: AdvanceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployerInput = {
    id?: string
    userId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycReviewerId?: string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    advances?: AdvanceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployerInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployerInput, EmployeeUncheckedCreateWithoutEmployerInput>
  }

  export type EmployeeCreateManyEmployerInputEnvelope = {
    data: EmployeeCreateManyEmployerInput | EmployeeCreateManyEmployerInput[]
    skipDuplicates?: boolean
  }

  export type LiquidityPoolCreateWithoutEmployerInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiquidityPoolUncheckedCreateWithoutEmployerInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiquidityPoolCreateOrConnectWithoutEmployerInput = {
    where: LiquidityPoolWhereUniqueInput
    create: XOR<LiquidityPoolCreateWithoutEmployerInput, LiquidityPoolUncheckedCreateWithoutEmployerInput>
  }

  export type LiquidityPoolCreateManyEmployerInputEnvelope = {
    data: LiquidityPoolCreateManyEmployerInput | LiquidityPoolCreateManyEmployerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEmployerInput = {
    update: XOR<UserUpdateWithoutEmployerInput, UserUncheckedUpdateWithoutEmployerInput>
    create: XOR<UserCreateWithoutEmployerInput, UserUncheckedCreateWithoutEmployerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmployerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmployerInput, UserUncheckedUpdateWithoutEmployerInput>
  }

  export type UserUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type MarketerUpsertWithoutEmployersInput = {
    update: XOR<MarketerUpdateWithoutEmployersInput, MarketerUncheckedUpdateWithoutEmployersInput>
    create: XOR<MarketerCreateWithoutEmployersInput, MarketerUncheckedCreateWithoutEmployersInput>
    where?: MarketerWhereInput
  }

  export type MarketerUpdateToOneWithWhereWithoutEmployersInput = {
    where?: MarketerWhereInput
    data: XOR<MarketerUpdateWithoutEmployersInput, MarketerUncheckedUpdateWithoutEmployersInput>
  }

  export type MarketerUpdateWithoutEmployersInput = {
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMarketerNestedInput
  }

  export type MarketerUncheckedUpdateWithoutEmployersInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutVerifiedEmployersInput = {
    update: XOR<UserUpdateWithoutVerifiedEmployersInput, UserUncheckedUpdateWithoutVerifiedEmployersInput>
    create: XOR<UserCreateWithoutVerifiedEmployersInput, UserUncheckedCreateWithoutVerifiedEmployersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerifiedEmployersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerifiedEmployersInput, UserUncheckedUpdateWithoutVerifiedEmployersInput>
  }

  export type UserUpdateWithoutVerifiedEmployersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employer?: EmployerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerifiedEmployersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type EmployeeUpsertWithWhereUniqueWithoutEmployerInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutEmployerInput, EmployeeUncheckedUpdateWithoutEmployerInput>
    create: XOR<EmployeeCreateWithoutEmployerInput, EmployeeUncheckedCreateWithoutEmployerInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutEmployerInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutEmployerInput, EmployeeUncheckedUpdateWithoutEmployerInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutEmployerInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutEmployerInput>
  }

  export type LiquidityPoolUpsertWithWhereUniqueWithoutEmployerInput = {
    where: LiquidityPoolWhereUniqueInput
    update: XOR<LiquidityPoolUpdateWithoutEmployerInput, LiquidityPoolUncheckedUpdateWithoutEmployerInput>
    create: XOR<LiquidityPoolCreateWithoutEmployerInput, LiquidityPoolUncheckedCreateWithoutEmployerInput>
  }

  export type LiquidityPoolUpdateWithWhereUniqueWithoutEmployerInput = {
    where: LiquidityPoolWhereUniqueInput
    data: XOR<LiquidityPoolUpdateWithoutEmployerInput, LiquidityPoolUncheckedUpdateWithoutEmployerInput>
  }

  export type LiquidityPoolUpdateManyWithWhereWithoutEmployerInput = {
    where: LiquidityPoolScalarWhereInput
    data: XOR<LiquidityPoolUpdateManyMutationInput, LiquidityPoolUncheckedUpdateManyWithoutEmployerInput>
  }

  export type LiquidityPoolScalarWhereInput = {
    AND?: LiquidityPoolScalarWhereInput | LiquidityPoolScalarWhereInput[]
    OR?: LiquidityPoolScalarWhereInput[]
    NOT?: LiquidityPoolScalarWhereInput | LiquidityPoolScalarWhereInput[]
    id?: UuidFilter<"LiquidityPool"> | string
    employerId?: UuidFilter<"LiquidityPool"> | string
    amount?: DecimalFilter<"LiquidityPool"> | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFilter<"LiquidityPool"> | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFilter<"LiquidityPool"> | string
    timestamp?: DateTimeFilter<"LiquidityPool"> | Date | string
    createdAt?: DateTimeFilter<"LiquidityPool"> | Date | string
    updatedAt?: DateTimeFilter<"LiquidityPool"> | Date | string
  }

  export type UserCreateWithoutEmployeeInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employer?: EmployerCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateWithoutEmployeeInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserCreateOrConnectWithoutEmployeeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployerCreateWithoutEmployeesInput = {
    id?: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployerInput
    marketer?: MarketerCreateNestedOneWithoutEmployersInput
    verifiedByUser?: UserCreateNestedOneWithoutVerifiedEmployersInput
    liquidityPools?: LiquidityPoolCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutEmployeesInput = {
    id?: string
    userId: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    liquidityPools?: LiquidityPoolUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutEmployeesInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutEmployeesInput, EmployerUncheckedCreateWithoutEmployeesInput>
  }

  export type UserCreateWithoutKycReviewerEmployeesInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employer?: EmployerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateWithoutKycReviewerEmployeesInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserCreateOrConnectWithoutKycReviewerEmployeesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKycReviewerEmployeesInput, UserUncheckedCreateWithoutKycReviewerEmployeesInput>
  }

  export type AdvanceCreateWithoutEmployeeInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    repaymentAmount: Decimal | DecimalJsLike | number | string
    requestDate: Date | string
    approvalDate?: Date | string | null
    paymentDate?: Date | string | null
    dueDate: Date | string
    status?: $Enums.EnumAdvancesStatus
    transactionHash?: string | null
    repaymentTransactionHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdvanceUncheckedCreateWithoutEmployeeInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    repaymentAmount: Decimal | DecimalJsLike | number | string
    requestDate: Date | string
    approvalDate?: Date | string | null
    paymentDate?: Date | string | null
    dueDate: Date | string
    status?: $Enums.EnumAdvancesStatus
    transactionHash?: string | null
    repaymentTransactionHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdvanceCreateOrConnectWithoutEmployeeInput = {
    where: AdvanceWhereUniqueInput
    create: XOR<AdvanceCreateWithoutEmployeeInput, AdvanceUncheckedCreateWithoutEmployeeInput>
  }

  export type AdvanceCreateManyEmployeeInputEnvelope = {
    data: AdvanceCreateManyEmployeeInput | AdvanceCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEmployeeInput = {
    update: XOR<UserUpdateWithoutEmployeeInput, UserUncheckedUpdateWithoutEmployeeInput>
    create: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmployeeInput, UserUncheckedUpdateWithoutEmployeeInput>
  }

  export type UserUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employer?: EmployerUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type EmployerUpsertWithoutEmployeesInput = {
    update: XOR<EmployerUpdateWithoutEmployeesInput, EmployerUncheckedUpdateWithoutEmployeesInput>
    create: XOR<EmployerCreateWithoutEmployeesInput, EmployerUncheckedCreateWithoutEmployeesInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutEmployeesInput, EmployerUncheckedUpdateWithoutEmployeesInput>
  }

  export type EmployerUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployerNestedInput
    marketer?: MarketerUpdateOneWithoutEmployersNestedInput
    verifiedByUser?: UserUpdateOneWithoutVerifiedEmployersNestedInput
    liquidityPools?: LiquidityPoolUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liquidityPools?: LiquidityPoolUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type UserUpsertWithoutKycReviewerEmployeesInput = {
    update: XOR<UserUpdateWithoutKycReviewerEmployeesInput, UserUncheckedUpdateWithoutKycReviewerEmployeesInput>
    create: XOR<UserCreateWithoutKycReviewerEmployeesInput, UserUncheckedCreateWithoutKycReviewerEmployeesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKycReviewerEmployeesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKycReviewerEmployeesInput, UserUncheckedUpdateWithoutKycReviewerEmployeesInput>
  }

  export type UserUpdateWithoutKycReviewerEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employer?: EmployerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKycReviewerEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type AdvanceUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AdvanceWhereUniqueInput
    update: XOR<AdvanceUpdateWithoutEmployeeInput, AdvanceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AdvanceCreateWithoutEmployeeInput, AdvanceUncheckedCreateWithoutEmployeeInput>
  }

  export type AdvanceUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AdvanceWhereUniqueInput
    data: XOR<AdvanceUpdateWithoutEmployeeInput, AdvanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type AdvanceUpdateManyWithWhereWithoutEmployeeInput = {
    where: AdvanceScalarWhereInput
    data: XOR<AdvanceUpdateManyMutationInput, AdvanceUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AdvanceScalarWhereInput = {
    AND?: AdvanceScalarWhereInput | AdvanceScalarWhereInput[]
    OR?: AdvanceScalarWhereInput[]
    NOT?: AdvanceScalarWhereInput | AdvanceScalarWhereInput[]
    id?: UuidFilter<"Advance"> | string
    employeeId?: UuidFilter<"Advance"> | string
    amount?: DecimalFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFilter<"Advance"> | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFilter<"Advance"> | Date | string
    approvalDate?: DateTimeNullableFilter<"Advance"> | Date | string | null
    paymentDate?: DateTimeNullableFilter<"Advance"> | Date | string | null
    dueDate?: DateTimeFilter<"Advance"> | Date | string
    status?: EnumEnumAdvancesStatusFilter<"Advance"> | $Enums.EnumAdvancesStatus
    transactionHash?: StringNullableFilter<"Advance"> | string | null
    repaymentTransactionHash?: StringNullableFilter<"Advance"> | string | null
    createdAt?: DateTimeFilter<"Advance"> | Date | string
    updatedAt?: DateTimeFilter<"Advance"> | Date | string
  }

  export type EmployeeCreateWithoutAdvancesInput = {
    id?: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    employer: EmployerCreateNestedOneWithoutEmployeesInput
    kycReviewer?: UserCreateNestedOneWithoutKycReviewerEmployeesInput
  }

  export type EmployeeUncheckedCreateWithoutAdvancesInput = {
    id?: string
    userId: string
    employerId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycReviewerId?: string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateOrConnectWithoutAdvancesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAdvancesInput, EmployeeUncheckedCreateWithoutAdvancesInput>
  }

  export type EmployeeUpsertWithoutAdvancesInput = {
    update: XOR<EmployeeUpdateWithoutAdvancesInput, EmployeeUncheckedUpdateWithoutAdvancesInput>
    create: XOR<EmployeeCreateWithoutAdvancesInput, EmployeeUncheckedCreateWithoutAdvancesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAdvancesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAdvancesInput, EmployeeUncheckedUpdateWithoutAdvancesInput>
  }

  export type EmployeeUpdateWithoutAdvancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    employer?: EmployerUpdateOneRequiredWithoutEmployeesNestedInput
    kycReviewer?: UserUpdateOneWithoutKycReviewerEmployeesNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAdvancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerCreateWithoutLiquidityPoolsInput = {
    id?: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployerInput
    marketer?: MarketerCreateNestedOneWithoutEmployersInput
    verifiedByUser?: UserCreateNestedOneWithoutVerifiedEmployersInput
    employees?: EmployeeCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutLiquidityPoolsInput = {
    id?: string
    userId: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutLiquidityPoolsInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutLiquidityPoolsInput, EmployerUncheckedCreateWithoutLiquidityPoolsInput>
  }

  export type EmployerUpsertWithoutLiquidityPoolsInput = {
    update: XOR<EmployerUpdateWithoutLiquidityPoolsInput, EmployerUncheckedUpdateWithoutLiquidityPoolsInput>
    create: XOR<EmployerCreateWithoutLiquidityPoolsInput, EmployerUncheckedCreateWithoutLiquidityPoolsInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutLiquidityPoolsInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutLiquidityPoolsInput, EmployerUncheckedUpdateWithoutLiquidityPoolsInput>
  }

  export type EmployerUpdateWithoutLiquidityPoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployerNestedInput
    marketer?: MarketerUpdateOneWithoutEmployersNestedInput
    verifiedByUser?: UserUpdateOneWithoutVerifiedEmployersNestedInput
    employees?: EmployeeUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutLiquidityPoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type UserCreateWithoutSentInvitationsInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employer?: EmployerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    receivedInvitations?: InvitationCreateNestedManyWithoutRecipientUserInput
  }

  export type UserUncheckedCreateWithoutSentInvitationsInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    receivedInvitations?: InvitationUncheckedCreateNestedManyWithoutRecipientUserInput
  }

  export type UserCreateOrConnectWithoutSentInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
  }

  export type UserCreateWithoutReceivedInvitationsInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerCreateNestedOneWithoutUserInput
    employer?: EmployerCreateNestedOneWithoutUserInput
    employee?: EmployeeCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationCreateNestedManyWithoutSenderUserInput
  }

  export type UserUncheckedCreateWithoutReceivedInvitationsInput = {
    id?: string
    username?: string | null
    email: string
    password: string
    role?: $Enums.EnumUsersRole
    walletAddress?: string | null
    isActive?: boolean
    isWalletVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    marketer?: MarketerUncheckedCreateNestedOneWithoutUserInput
    employer?: EmployerUncheckedCreateNestedOneWithoutUserInput
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    verifiedEmployers?: EmployerUncheckedCreateNestedManyWithoutVerifiedByUserInput
    kycReviewerEmployees?: EmployeeUncheckedCreateNestedManyWithoutKycReviewerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutSenderUserInput
  }

  export type UserCreateOrConnectWithoutReceivedInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
  }

  export type UserUpsertWithoutSentInvitationsInput = {
    update: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employer?: EmployerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    receivedInvitations?: InvitationUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    receivedInvitations?: InvitationUncheckedUpdateManyWithoutRecipientUserNestedInput
  }

  export type UserUpsertWithoutReceivedInvitationsInput = {
    update: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type UserUpdateWithoutReceivedInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUpdateOneWithoutUserNestedInput
    employer?: EmployerUpdateOneWithoutUserNestedInput
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutSenderUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumEnumUsersRoleFieldUpdateOperationsInput | $Enums.EnumUsersRole
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isWalletVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketer?: MarketerUncheckedUpdateOneWithoutUserNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutUserNestedInput
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    verifiedEmployers?: EmployerUncheckedUpdateManyWithoutVerifiedByUserNestedInput
    kycReviewerEmployees?: EmployeeUncheckedUpdateManyWithoutKycReviewerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutSenderUserNestedInput
  }

  export type EmployerCreateManyVerifiedByUserInput = {
    id?: string
    userId: string
    marketerId?: number | null
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateManyKycReviewerInput = {
    id?: string
    userId: string
    employerId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationCreateManySenderUserInput = {
    id?: string
    targetEmail: string
    recipientUserId?: string | null
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationCreateManyRecipientUserInput = {
    id?: string
    targetEmail: string
    senderUserId: string
    expiresAt: Date | string
    status?: $Enums.EnumInvitationsStatus
    role: $Enums.EnumInvitationsRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployerUpdateWithoutVerifiedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployerNestedInput
    marketer?: MarketerUpdateOneWithoutEmployersNestedInput
    employees?: EmployeeUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutVerifiedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateManyWithoutVerifiedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketerId?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUpdateWithoutKycReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    employer?: EmployerUpdateOneRequiredWithoutEmployeesNestedInput
    advances?: AdvanceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutKycReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    advances?: AdvanceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutKycReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employerId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUpdateWithoutSenderUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipientUser?: UserUpdateOneWithoutReceivedInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutSenderUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    recipientUserId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyWithoutSenderUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    recipientUserId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUpdateWithoutRecipientUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderUser?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutRecipientUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyWithoutRecipientUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumInvitationsStatusFieldUpdateOperationsInput | $Enums.EnumInvitationsStatus
    role?: EnumEnumInvitationsRoleFieldUpdateOperationsInput | $Enums.EnumInvitationsRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerCreateManyMarketerInput = {
    id?: string
    userId: string
    companyName: string
    registrationDate: Date | string
    isVerified?: boolean
    verificationDate?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployerUpdateWithoutMarketerInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployerNestedInput
    verifiedByUser?: UserUpdateOneWithoutVerifiedEmployersNestedInput
    employees?: EmployeeUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutMarketerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutEmployerNestedInput
    liquidityPools?: LiquidityPoolUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateManyWithoutMarketerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateManyEmployerInput = {
    id?: string
    userId: string
    kycStage?: $Enums.EnumEmployeesKycStage
    kycStatus?: $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: Date | string | null
    kycReviewedAt?: Date | string | null
    kycReviewerId?: string | null
    kycNotes?: string | null
    salary?: Decimal | DecimalJsLike | number | string | null
    registrationDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiquidityPoolCreateManyEmployerInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    transactionType: $Enums.EnumLiquidityPoolTransactionType
    transactionHash: string
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    kycReviewer?: UserUpdateOneWithoutKycReviewerEmployeesNestedInput
    advances?: AdvanceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    advances?: AdvanceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kycStage?: EnumEnumEmployeesKycStageFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStage
    kycStatus?: EnumEnumEmployeesKycStatusFieldUpdateOperationsInput | $Enums.EnumEmployeesKycStatus
    kycSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kycReviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    kycNotes?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidityPoolUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidityPoolUncheckedUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidityPoolUncheckedUpdateManyWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionType?: EnumEnumLiquidityPoolTransactionTypeFieldUpdateOperationsInput | $Enums.EnumLiquidityPoolTransactionType
    transactionHash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdvanceCreateManyEmployeeInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    repaymentAmount: Decimal | DecimalJsLike | number | string
    requestDate: Date | string
    approvalDate?: Date | string | null
    paymentDate?: Date | string | null
    dueDate: Date | string
    status?: $Enums.EnumAdvancesStatus
    transactionHash?: string | null
    repaymentTransactionHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdvanceUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdvanceUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdvanceUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    repaymentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEnumAdvancesStatusFieldUpdateOperationsInput | $Enums.EnumAdvancesStatus
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    repaymentTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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