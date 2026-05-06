local request = http_request or request or HttpPost or syn.request
local userid = game.Players.LocalPlayer.UserId
local player = game:GetService("Players").LocalPlayer
local decoded = game:GetService("HttpService"):JSONDecode(request({Url = 'https://httpbin.org/get'; Method = 'GET'}).Body);
local hwid_list = {"fingerprinti identifiers here"};
local exploit = syn and "names1" or KRNL_LOADED and "names2"
local HWID;

local key = "d120a957800e8770ca1d667150c3491b"

for i, v in next, hwid_list do
    if decoded.headers[v] then
        HWID = decoded.headers[v];
        break
    end
end

local resp = request({
	Url = "https://api.whateverisyours.xyz/login/"..key.."/"..HWID,
	Headers = {
     ["API-Key"] = "my_robson"
	}
})

local data = game:GetService("HttpService"):JSONDecode(resp.Body)
print(data.message)

if data.message == "Whitelisted" then
	print('Whitelisted')
	-- run loadstring
end

 if data.message == "Not Whitelisted" then

    local resp2 = request({
        Url = "https://api.youreapithinghere.xyz/register/"..key.."/"..HWID.."/"..exploit.."/"..userid.."/",
        Headers = {
         ["API-Key"] = "my_boy"
        }
    })

local data2 = game:GetService("HttpService"):JSONDecode(resp2.Body)
print(data2.status)

if data2.status == "Key-Not-Found" then
	player:Kick("Invalid Key")
    end
 end

