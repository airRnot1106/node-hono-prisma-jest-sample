"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definePostFactory = exports.defineUserFactory = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = exports.initialize = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return internal_2.initialize; } });
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const modelFieldDefinitions = [{
        name: "User",
        fields: [{
                name: "posts",
                type: "Post",
                relationName: "PostToUser"
            }]
    }, {
        name: "Post",
        fields: [{
                name: "author",
                type: "User",
                relationName: "PostToUser"
            }]
    }];
function autoGenerateUserScalarsOrEnums({ seq }) {
    return {
        email: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "email", isId: false, isUnique: true, seq })
    };
}
function defineUserFactoryInternal({ defaultData: defaultDataResolver, traits: traitsDefs = {} }) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("User", modelFieldDefinitions);
        const build = (inputData = {}) => __awaiter(this, void 0, void 0, function* () {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver !== null && defaultDataResolver !== void 0 ? defaultDataResolver : {});
            const defaultData = yield traitKeys.reduce((queue, traitKey) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const acc = yield queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)((_b = (_a = traitsDefs[traitKey]) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {});
                const traitData = yield resolveTraitValue({ seq });
                return Object.assign(Object.assign({}, acc), traitData);
            }), resolveValue({ seq }));
            const defaultAssociations = {};
            const data = Object.assign(Object.assign(Object.assign(Object.assign({}, requiredScalarData), defaultData), defaultAssociations), inputData);
            return data;
        });
        const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = (inputData = {}) => __awaiter(this, void 0, void 0, function* () {
            const data = yield build(inputData).then(screen);
            return yield (0, internal_1.getClient)().user.create({ data });
        });
        const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return Object.assign(Object.assign({}, factory), { use: useTraits });
}
/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
function defineUserFactory(options) {
    return defineUserFactoryInternal(options !== null && options !== void 0 ? options : {});
}
exports.defineUserFactory = defineUserFactory;
function isPostauthorFactory(x) {
    return (x === null || x === void 0 ? void 0 : x._factoryFor) === "User";
}
function autoGeneratePostScalarsOrEnums({ seq }) {
    return {
        title: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Post", fieldName: "title", isId: false, isUnique: false, seq })
    };
}
function definePostFactoryInternal({ defaultData: defaultDataResolver, traits: traitsDefs = {} }) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Post", modelFieldDefinitions);
        const build = (inputData = {}) => __awaiter(this, void 0, void 0, function* () {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePostScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver !== null && defaultDataResolver !== void 0 ? defaultDataResolver : {});
            const defaultData = yield traitKeys.reduce((queue, traitKey) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const acc = yield queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)((_b = (_a = traitsDefs[traitKey]) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {});
                const traitData = yield resolveTraitValue({ seq });
                return Object.assign(Object.assign({}, acc), traitData);
            }), resolveValue({ seq }));
            const defaultAssociations = {
                author: isPostauthorFactory(defaultData.author) ? {
                    create: yield defaultData.author.build()
                } : defaultData.author
            };
            const data = Object.assign(Object.assign(Object.assign(Object.assign({}, requiredScalarData), defaultData), defaultAssociations), inputData);
            return data;
        });
        const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = (inputData = {}) => __awaiter(this, void 0, void 0, function* () {
            const data = yield build(inputData).then(screen);
            return yield (0, internal_1.getClient)().post.create({ data });
        });
        const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Post",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return Object.assign(Object.assign({}, factory), { use: useTraits });
}
/**
 * Define factory for {@link Post} model.
 *
 * @param options
 * @returns factory {@link PostFactoryInterface}
 */
function definePostFactory(options) {
    return definePostFactoryInternal(options);
}
exports.definePostFactory = definePostFactory;
