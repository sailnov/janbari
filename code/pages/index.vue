<script setup>
    const startGameCount = ref(0);

    const myGameCount = ref(0);

    const totalGameCount = computed({
        get: () => {
            return myGameCount.value + startGameCount.value;
        },
        set: (value) => {
            myGameCount.value = value - startGameCount.value;
        },
    });

    const slotData = ref([
        {
            id: 1,
            name: "ファンキージャグラー",
            demes: [
                {
                    id: 1,
                    name: "リプレイ",
                    color: "#f97316",
                    count: 0,
                    demerates: {
                        1: 7.3,
                        2: 7.3,
                        3: 7.3,
                        4: 7.3,
                        5: 7.3,
                        6: 7.3,
                    },
                },
                {
                    id: 2,
                    name: "ぶどう",
                    color: "#7c3aed",
                    count: 0,
                    demerates: {
                        1: 5.94,
                        2: 5.92,
                        3: 5.88,
                        4: 5.83,
                        5: 5.76,
                        6: 5.67,
                    },
                },
                {
                    id: 3,
                    name: "チェリー",
                    color: "#65a30d",
                    count: 0,
                    demerates: {
                        1: 35.62,
                        2: 35.52,
                        3: 35.52,
                        4: 35.52,
                        5: 35.52,
                        6: 35.52,
                    },
                },
                {
                    id: 4,
                    name: "ベル",
                    color: "#facc15",
                    count: 0,
                    demerates: {
                        1: 1083.9,
                        2: 1083.9,
                        3: 1083.9,
                        4: 1083.9,
                        5: 1083.9,
                        6: 1083.9,
                    },
                },
                {
                    id: 5,
                    name: "ピエロ",
                    color: "#db2777",
                    count: 0,
                    demerates: {
                        1: 1100.0,
                        2: 1100.0,
                        3: 1100.0,
                        4: 1100.0,
                        5: 1100.0,
                        6: 1100.0,
                    },
                },
                {
                    id: 6,
                    name: "BB",
                    color: "#dc2626",
                    count: 0,
                    demerates: {
                        1: 266.4,
                        2: 259.0,
                        3: 256.0,
                        4: 249.2,
                        5: 240.1,
                        6: 219.9,
                    },
                },
                {
                    id: 7,
                    name: "RB",
                    color: "#1d4ed8",
                    count: 0,
                    demerates: {
                        1: 439.8,
                        2: 407.1,
                        3: 366.1,
                        4: 322.8,
                        5: 299.3,
                        6: 262.1,
                    },
                },
            ],
        },
    ]);

    const hazureCount = ref(0);

    const currentSlot = ref(1);

    const demeIsIncrease = ref(true);

    const round = (value, precision) => {
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    };

    const findNearestDeme = (demerates, value) => {
        const x100Value = value * 100;
        const deme = Object.entries(demerates).reduce((prev, current) => {
            const [key, demerate] = current;
            const x100Deme = demerate * 100;
            const x100Prev = prev[1] * 100;
            const x100Diff = Math.abs(x100Deme - x100Value);
            const x100PrevDiff = Math.abs(x100Prev - x100Value);
            // compare key
            if (x100Diff === x100PrevDiff) {
                return key < prev[0] ? current : prev;
            }
            return x100Diff < x100PrevDiff ? current : prev;
        });
        // if all demerate is same
        let sameFlag = true;
        Object.entries(demerates).forEach(([, demerate]) => {
            if (deme[1] !== demerate) {
                sameFlag = false;
            }
        });
        if (sameFlag) {
            return `共通 : 1 / ${deme[1]}`;
        }
        return `設定${deme[0]} : 1 / ${deme[1]}`;
    };

    const resetAll = () => {
        slotData.value.forEach((slot) => {
            slot.demes.forEach((deme) => {
                deme.count = 0;
            });
        });
        hazureCount.value = 0;
        startGameCount.value = 0;
        myGameCount.value = 0;
    };
</script>

<template>
    <div class="navbar bg-base-200">
        <div class="navbar-start">
            <button class="btn btn-circle btn-ghost">
                <Icon name="material-symbols:settings-outline" size="24" />
            </button>
        </div>
        <div class="navbar-center">
            <select class="select w-full max-w-xs bg-base-200 focus:outline-0" v-model="currentSlot">
                <option v-for="slot in slotData" :value="slot.id">
                    {{ slot.name }}
                </option>
            </select>
        </div>
        <div class="navbar-end">
            <!-- Open the modal using ID.showModal() method -->
            <dialog id="my_modal_1" class="modal">
                <form method="dialog" class="modal-box">
                    <h3 class="font-bold text-lg">リセットしますか？</h3>
                    <p class="py-4">
                        リセットすると現在のデータは全て消去されます。
                    </p>
                    <div class="modal-action">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn w-full bg-red-200 text-red-600" @click="resetAll">リセット</button>
                    </div>
                </form>
            </dialog>
            <button class="btn btn-circle btn-ghost" onclick="my_modal_1.showModal()">
                <Icon name="ant-design:clear-outlined" size="24" />
            </button>
        </div>
    </div>
    <main class="p-4 container mx-auto">
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-full md:col-span-6">
                <div class="card bg-base-200 mb-4">
                    <div class="card-body py-2 px-4">
                        <div class="card-title text-base flex justify-between">{{ slotData[currentSlot - 1].name }}</div>
                        <ul class="divide divide-y-2">
                            <li class="flex justify-between text-sm items-center py-2">
                                <span>開始ゲーム数</span>
                                <input type="number" class="input input-sm max-w-[5rem]" v-model="startGameCount" />
                            </li>
                            <li class="flex justify-between text-sm items-center py-2">
                                <span>総合ゲーム数</span>
                                <input type="number" class="input input-sm max-w-[5rem]" v-model="totalGameCount" disabled />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card bg-base-200 mb-4">
                    <div class="card-body p-2">
                        <div class="card-title text-base px-2 flex justify-between">
                            出目カウンター [{{ demeIsIncrease ? "追加" : "減算" }}]
                            <label class="swap swap-rotate">
                                <input type="checkbox" v-model="demeIsIncrease" />
                                <Icon class="swap-on" name="tabler:plus-minus" size="24" />
                                <Icon class="swap-off rotate-180" name="tabler:plus-minus" size="24" />
                            </label>
                        </div>
                        <div class="grid grid-cols-4 gap-4 justify-center">
                            <div class="col-span-1 text-center">
                                <span class="text-xs"> 1 / ∞ </span>
                                <div class="text-3xl font-bold mb-2">
                                    <code>{{ hazureCount }}</code>
                                </div>
                                <button
                                    :class="`btn btn-lg btn-square mx-auto mb-2 bg-gray-400`"
                                    @click="hazureCount++ & myGameCount++"
                                    v-if="demeIsIncrease"
                                >
                                    <Icon class="text-base-100" name="tabler:exposure-plus-1" size="24" />
                                </button>
                                <button :class="`btn btn-lg btn-square mx-auto mb-2 bg-gray-400`" @click="hazureCount-- & myGameCount--" v-else>
                                    <Icon class="text-base-100" name="tabler:exposure-minus-1" size="24" />
                                </button>
                                <div class="text-xs">はずれ</div>
                            </div>
                            <div class="col-span-1 text-center" v-for="item in slotData[currentSlot - 1].demes" :key="'demes-' + item.id">
                                <span class="text-xs">
                                    {{ item.count > 0 ? 1 : 0 }} /
                                    {{ myGameCount > 0 && item.count > 0 ? round(myGameCount / item.count, 2) : 0 }}
                                </span>
                                <div class="text-3xl font-bold mb-2">
                                    <code>{{ item.count }}</code>
                                </div>
                                <button
                                    :class="`btn btn-lg btn-square mx-auto mb-2 touch-manipulation`"
                                    :style="`background-color: ${item.color}`"
                                    @click="item.count++ & myGameCount++"
                                    v-show="demeIsIncrease"
                                >
                                    <Icon class="text-base-100" name="tabler:exposure-plus-1" size="24" />
                                </button>
                                <button
                                    :class="`btn btn-lg btn-square mx-auto mb-2 touch-manipulation`"
                                    :style="`background-color: ${item.color}`"
                                    @click="item.count-- & myGameCount--"
                                    v-show="!demeIsIncrease"
                                >
                                    <Icon class="text-base-100" name="tabler:exposure-minus-1" size="24" />
                                </button>
                                <div class="text-xs">{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-full md:col-span-6">
                <div class="card bg-base-200 mb-4">
                    <div class="card-body py-2 px-4">
                        <div class="card-title text-base flex justify-between">設定判別 [{{ slotData[currentSlot - 1].name }}]</div>
                        <ul class="divide divide-y-2">
                            <li class="flex justify-between text-sm items-center" v-for="item in slotData[currentSlot - 1].demes">
                                <div class="collapse bg-base-200 py-0 outline-0">
                                    <input type="checkbox" />
                                    <div class="collapse-title outline-0 min-h-[2rem] py-2">
                                        <div class="text-sm flex flex-row items-center gap-3">
                                            <div class="p-2" :style="`background-color: ${item.color}`"></div>
                                            <div class="">
                                                <div class="text-sm">{{ item.name }}</div>
                                                <div class="text-xs">
                                                    <span class="font-bold" v-if="myGameCount > 0 && item.count > 0">
                                                        {{
                                                            findNearestDeme(
                                                                item.demerates,
                                                                myGameCount > 0 && item.count > 0 ? round(myGameCount / item.count, 2) : 0
                                                            )
                                                        }}
                                                    </span>
                                                    <span class="font-bold" v-else> 測定不能 </span>
                                                </div>
                                            </div>
                                            <div class="text-sm ml-auto">
                                                <code> 1 / {{ myGameCount > 0 && item.count > 0 ? round(myGameCount / item.count, 2) : 0 }} </code>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="collapse-content">
                                        <ul class="divide divide-y-2">
                                            <li
                                                class="flex justify-between text-sm items-center py-2"
                                                v-for="(i, index) in 6"
                                                :key="'demerates-' + item.id + '-' + index"
                                            >
                                                <span>設定{{ i }}</span>
                                                <div class="flex items-center gap-2">
                                                    <code>1 /</code>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        class="input input-sm max-w-[5rem]"
                                                        v-model="item.demerates[i]"
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
