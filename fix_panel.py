import re

def create_advanced_filter(form_type="sale"):
    # form_type is either "sale" or "rent"
    
    html = f'''                    <div id="form-{form_type}"
                        class="search-form-pane {"hidden" if form_type == "rent" else ""} flex flex-col bg-white p-6 rounded-b-xl rounded-tr-xl shadow-[0_15px_50px_rgba(0,0,0,0.08)] w-full relative z-40">
                        
                        <!-- Top Row (Always visible) -->
                        <div class="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 lg:gap-6 w-full">
'''
    
    if form_type == "sale":
        html += '''                            <!-- Status -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Status</label>
                                <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span class="font-medium">All Status</span>
                                    <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <div class="w-px h-10 bg-gray-200 hidden lg:block mt-[34px]"></div>
                            
                            <!-- Labels -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Labels</label>
                                <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span class="font-medium">All Labels</span>
                                    <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <div class="w-px h-10 bg-gray-200 hidden lg:block mt-[34px]"></div>

                            <!-- Types -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Types</label>
                                <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span class="font-medium">All Types</span>
                                    <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <div class="w-px h-10 bg-gray-200 hidden lg:block mt-[34px]"></div>
'''
    else:
        html += '''                            <!-- Rent Period -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Rent Period</label>
                                <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span class="font-medium">Monthly</span>
                                    <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <div class="w-px h-10 bg-gray-200 hidden lg:block mt-[34px]"></div>
                            
                            <!-- Location -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Location</label>
                                <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span class="font-medium">All Locations</span>
                                    <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <div class="w-px h-10 bg-gray-200 hidden lg:block mt-[34px]"></div>

                            <!-- Property Types -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Property</label>
                                <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span class="font-medium">Apartments</span>
                                    <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <div class="w-px h-10 bg-gray-200 hidden lg:block mt-[34px]"></div>
'''

    # Common Customize & Search Button
    html += f'''                            <!-- Customize -->
                            <div class="flex-1 flex flex-col gap-2.5">
                                <label class="text-[14px] font-semibold text-gray-900">Customize</label>
                                <div id="btn-advance-{form_type}" onclick="toggleAdvancePanel('{form_type}')" class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 font-medium text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                    <span>Advance</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <!-- Search Button -->
                            <button class="bg-primary hover:bg-[#b5c724] text-black font-semibold text-[15px] px-8 py-3 rounded-lg flex items-center justify-center gap-2 self-stretch lg:self-end mt-2 lg:mt-auto transition-transform hover:-translate-y-px h-[48px] ml-0 lg:ml-4 w-full lg:w-auto">
                                Search
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Advanced Filter Panel (Hidden by default, absolute positioned to overlay downwards) -->
                        <div id="advanced-panel-{form_type}" class="hidden absolute top-full left-0 w-full mt-4 bg-white p-6 shadow-2xl rounded-xl flex-col gap-6 z-50 border border-gray-100">
                            
                            <!-- Row 1: Bathrooms, Bedrooms, States, City -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                <div class="flex flex-col gap-2.5">
                                    <label class="text-[14px] font-semibold text-gray-900">Bathrooms</label>
                                    <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                        <span class="font-medium">Bathrooms</span>
                                        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <label class="text-[14px] font-semibold text-gray-900">Bedrooms</label>
                                    <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                        <span class="font-medium">Bedrooms</span>
                                        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <label class="text-[14px] font-semibold text-gray-900">States</label>
                                    <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                        <span class="font-medium">All States</span>
                                        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <label class="text-[14px] font-semibold text-gray-900">City</label>
                                    <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                        <span class="font-medium">All Cities</span>
                                        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Row 2: Garages, Rooms, Sliders -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                                <!-- Garages & Rooms in one col -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="flex flex-col gap-2.5">
                                        <label class="text-[14px] font-semibold text-gray-900">Garages</label>
                                        <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                            <span class="font-medium">Any Garages</span>
                                            <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2.5">
                                        <label class="text-[14px] font-semibold text-gray-900">Rooms</label>
                                        <div class="custom-select flex justify-between items-center bg-lightbg hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 text-[15px] cursor-pointer transition-colors border border-transparent h-[48px]">
                                            <span class="font-medium">Any Rooms</span>
                                            <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <!-- Empty space to match image layout -->
                                <div class="hidden lg:block"></div>
                            </div>

                            <!-- Sliders -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
                                <div class="flex flex-col gap-4">
                                    <label class="text-[15px] font-semibold text-gray-900">Price Range: $200 - $2,500,000</label>
                                    <div class="relative w-full h-1 bg-primary/30 rounded-full">
                                        <div class="absolute top-0 left-0 h-full bg-primary rounded-full w-[100%]"></div>
                                        <div class="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer shadow-sm"></div>
                                        <div class="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer shadow-sm"></div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-4">
                                    <label class="text-[15px] font-semibold text-gray-900">Size Range: 146 SqFt - 448 SqFt</label>
                                    <div class="relative w-full h-1 bg-primary/30 rounded-full">
                                        <div class="absolute top-0 left-0 h-full bg-primary rounded-full w-[100%]"></div>
                                        <div class="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer shadow-sm"></div>
                                        <div class="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- OTHERS FEATURES -->
                            <div class="w-full mt-6">
                                <label class="text-[14px] font-semibold text-gray-900 uppercase tracking-wide block mb-6">OTHERS FEATURES</label>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6">
'''
    features = [
        "Air Conditioning", "Laundry", "Refrigerator", "Washer", 
        "Barbeque", "Lawn", "Sauna", "Wifi",
        "Dryer", "Microwave", "Swimming Pool", "Window Coverings",
        "Gym", "Outdoor Shower", "TV Cable", "Fireplace"
    ]
    for feature in features:
        html += f'''                                    <label class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative flex items-center justify-center w-4 h-4">
                                            <input type="checkbox" class="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-primary checked:border-primary cursor-pointer transition-colors">
                                            <svg class="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span class="text-[15px] text-gray-800 font-medium group-hover:text-primary transition-colors">{feature}</span>
                                    </label>
'''

    html += '''                                </div>
                            </div>
                        </div>
                    </div>'''
    
    return html

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to replace the entire form-sale block
    sale_pattern = re.compile(r'<!-- FOR SALE FORM -->.*?</div>\s*<!-- FOR RENT FORM -->', re.DOTALL)
    rent_pattern = re.compile(r'<!-- FOR RENT FORM -->.*?</div>\s*(?:<!-- Explore Cities Section -->|<!-- Properties Grid -->|</div>\s*</div>)', re.DOTALL)

    new_sale = "<!-- FOR SALE FORM -->\n" + create_advanced_filter("sale") + "\n\n                    <!-- FOR RENT FORM -->"
    
    # Check what comes after FOR RENT FORM in the file to preserve it
    rent_match = rent_pattern.search(content)
    if rent_match:
        old_rent_chunk = rent_match.group(0)
        # the end of the chunk is the delimiter we need to preserve
        if "<!-- Explore Cities Section -->" in old_rent_chunk:
            end_delim = "<!-- Explore Cities Section -->"
        elif "<!-- Properties Grid -->" in old_rent_chunk:
            end_delim = "<!-- Properties Grid -->"
        else:
            end_delim = "</div>\n                </div>"
            
        new_rent = "<!-- FOR RENT FORM -->\n" + create_advanced_filter("rent") + "\n\n                    " + end_delim
        
        content = sale_pattern.sub(new_sale, content)
        content = rent_pattern.sub(new_rent, content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find RENT form bounds in {filepath}")

import os
# First checkout the old versions to revert our previous commit so we have a clean slate to apply the new regex
os.system('git checkout HEAD~1 -- index.html property-halfmap-grid.html')

update_file('index.html')
update_file('property-halfmap-grid.html')
