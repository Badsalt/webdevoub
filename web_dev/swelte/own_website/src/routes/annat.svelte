<!-- 
    Notera att du kan göra en fil med ett namn, i detta fall annat.svelte,
    och då kommer navigering /annat ge oss innehållet i annat.svelte
    Du kan också om du vill göra en mapp med namnet annat och i den göra en fil som heter "index.svelte".
    Jag föredrar undermappar för ofta kommer en sida i en undermapp byggas upp av komponenter som man lägger i den undermappen.
-->
<div class="bg-base-200 flex flex-col items-center gap-20 py-20">
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-figure text-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-8 h-8 stroke-current"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    /></svg
                >
            </div>
            <div class="stat-title">Total Likes</div>
            <div class="stat-value text-primary">25.6K</div>
            <div class="stat-desc">21% more than last month</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-secondary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-8 h-8 stroke-current"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    /></svg
                >
            </div>
            <div class="stat-title">Page Views</div>
            <div class="stat-value text-secondary">2.6M</div>
            <div class="stat-desc">21% more than last month</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-secondary">
                <div class="avatar online">
                    <div class="w-16 rounded-full">
                        <img
                            src="https://api.lorem.space/image/face?w=128&h=128"
                        />
                    </div>
                </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">Tasks done</div>
            <div class="stat-desc text-secondary">31 tasks remaining</div>
        </div>
    </div>

    <div class="stats bg-primary text-primary-content">
        <div class="stat">
            <div class="stat-title">Account balance</div>
            <div class="stat-value">$89,400</div>
            <div class="stat-actions">
                <button class="btn btn-sm btn-success">Add funds</button>
            </div>
        </div>

        <div class="stat">
            <div class="stat-title">Current balance</div>
            <div class="stat-value">$89,400</div>
            <div class="stat-actions">
                <button class="btn btn-sm">Withdrawal</button>
                <button class="btn btn-sm">deposit</button>
            </div>
        </div>
    </div>

    <ul class="steps">
        <li data-content="?" class="step step-neutral">Step 1</li>
        <li data-content="!" class="step step-neutral">Step 2</li>
        <li data-content="✓" class="step step-neutral">Step 3</li>
        <li data-content="✕" class="step step-neutral">Step 4</li>
        <li data-content="★" class="step step-neutral">Step 5</li>
        <li data-content="" class="step step-neutral">Step 6</li>
        <li data-content="●" class="step step-neutral">Step 7</li>
    </ul>

    <select class="select select-primary w-full max-w-xs">
        <option disabled selected>What is the best TV show?</option>
        <option>Game of Thrones</option>
        <option>Lost</option>
        <option>Breaking Bad</option>
        <option>Walking Dead</option>
    </select>

    <div class="btn-group">
        <input type="radio" name="options" data-title="1" class="btn" />
        <input type="radio" name="options" data-title="2" class="btn" checked />
        <input type="radio" name="options" data-title="3" class="btn" />
        <input type="radio" name="options" data-title="4" class="btn" />
    </div>

    <div class="indicator">
        <span class="indicator-item badge badge-secondary">99+</span>
        <button class="btn">inbox</button>
    </div>

    <div class="form-control">
        <label class="input-group input-group-lg">
            <span>LG</span>
            <input
                type="text"
                placeholder="Type here"
                class="input input-bordered input-lg"
            />
        </label>
    </div>
    <div class="form-control">
        <label class="input-group input-group-md">
            <span>MD</span>
            <input
                type="text"
                placeholder="Type here"
                class="input input-bordered input-md"
            />
        </label>
    </div>
    <div class="form-control">
        <label class="input-group input-group-sm">
            <span>SM</span>
            <input
                type="text"
                placeholder="Type here"
                class="input input-bordered input-sm"
            />
        </label>
    </div>
    <div class="form-control">
        <label class="input-group input-group-xs">
            <span>XS</span>
            <input
                type="text"
                placeholder="Type here"
                class="input input-bordered input-xs"
            />
        </label>
    </div>

    <div class="btn-group">
        <input type="radio" name="options" data-title="1" class="btn" />
        <input type="radio" name="options" data-title="2" class="btn" checked />
        <input type="radio" name="options" data-title="3" class="btn" />
        <input type="radio" name="options" data-title="4" class="btn" />
    </div>

    <div class="flex flex-col w-full border-opacity-50">
        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
            content
        </div>
        <div class="divider">OR</div>
        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
            content
        </div>
    </div>

    <div class="flex flex-col w-full lg:flex-row">
        <div
            class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center"
        >
            content
        </div>
        <div class="divider lg:divider-horizontal">OR</div>
        <div
            class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center"
        >
            content
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr>
                <!-- row 2 -->
                <tr class="hover">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                </tr>
                <!-- row 3 -->
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="radial-progress" style="--value:0;">0%</div>
    <div class="radial-progress" style="--value:20;">20%</div>
    <div class="radial-progress" style="--value:60;">60%</div>
    <div class="radial-progress" style="--value:80;">80%</div>
    <div class="radial-progress" style="--value:100;">100%</div>

    <div
        tabindex="0"
        class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
        <div class="collapse-title text-xl font-medium">
            Focus me to see content
        </div>
        <div class="collapse-content">
            <p>tabindex="0" attribute is necessary to make the div focusable</p>
        </div>
    </div>

    <div class="carousel w-full">
        <div id="item1" class="carousel-item w-full">
            <img
                src="https://api.lorem.space/image/car?w=800&h=200&hash=8B7BCDC2"
                class="w-full"
            />
        </div>
        <div id="item2" class="carousel-item w-full">
            <img
                src="https://api.lorem.space/image/car?w=800&h=200&hash=500B67FB"
                class="w-full"
            />
        </div>
        <div id="item3" class="carousel-item w-full">
            <img
                src="https://api.lorem.space/image/car?w=800&h=200&hash=A89D0DE6"
                class="w-full"
            />
        </div>
        <div id="item4" class="carousel-item w-full">
            <img
                src="https://api.lorem.space/image/car?w=800&h=200&hash=225E6693"
                class="w-full"
            />
        </div>
    </div>
    <div class="flex justify-center w-full py-2 gap-2">
        <a href="#item1" class="btn btn-xs">1</a>
        <a href="#item2" class="btn btn-xs">2</a>
        <a href="#item3" class="btn btn-xs">3</a>
        <a href="#item4" class="btn btn-xs">4</a>
    </div>

    <div style:height="50px" />
</div>
