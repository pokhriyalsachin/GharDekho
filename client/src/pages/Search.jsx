import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
export default function Search () {
   const navigate = useNavigate();
  const [sidebarData, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const onShowMoreClick = async()=>{
    const numberOfListings = listings.length;
    const  startIndex =  numberOfListings;
    // backend se bhi limit of bande hi a rhe h 
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
        setShowMore(false);
    }
    setListings([...listings, ...data]);
    // add this data to your list of values..
  }
   useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebardata({
          searchTerm: searchTermFromUrl || '',
          type: typeFromUrl || 'all',
          parking: parkingFromUrl === 'true' ? true : false,
          furnished: furnishedFromUrl === 'true' ? true : false,
          offer: offerFromUrl === 'true' ? true : false,
          sort: sortFromUrl || 'created_at',
          order: orderFromUrl || 'desc',
        });
      }
    const fetchlistings = async()=> {
        setLoading(true);
        setShowMore(false);
    
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data= await res.json();
        // console.log()
        console.log(data.length);
        
        if(data.length > 8){
            setShowMore(true);
            //  matlab aur data h jisse show kar sakte h abhi hum
        }
        else{
            setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      
      }
      fetchlistings();
   },[location.search])
  


  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebarData, type: e.target.id });
    }

    if(e.target.id === 'searchTerm'){
        setSidebardata({...sidebarData , searchTerm: e.target.value});
    }

    if(  e.target.id === 'parking' ||
    e.target.id === 'furnished' ||
    e.target.id === 'offer'){
        setSidebardata({
            ...sidebarData,
            [e.target.id]:
              e.target.checked || e.target.checked === 'true' ? true : false,
          });
    }

    if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
    //split makea an array out of string based on _ and uska 1 conatins order of sorting
        setSidebardata({ ...sidebarData, sort, order });
    }

};

const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm' , sidebarData.searchTerm);
    urlParams.set('type' , sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
}

  return (
    <div className='flex flex-col md:flex-row p-5'>
      <div className='p-7 border-b-2 md:border-r-2 md:border-b-0'>
        <form  onSubmit={handleSubmit} className='flex flex-col gap-8' >
          <div className='flex items-center gap-2 mb-4'>
            <label htmlFor='searchTerm' className='whitespace-nowrap font-medium'>Search Term</label>
            <input type="text"  value={sidebarData.searchTerm} onChange={handleChange} id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>
          <div className='flex items-center gap-2 flex-wrap mb-4'>
            <label className='whitespace-nowrap font-medium'>Type</label>
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='all' className='w-5 h-5' checked={sidebarData.type === 'all'} onChange={handleChange} />
              <span>Rent & Sale</span>
            </div> 
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='rent' className='w-5 h-5' checked={sidebarData.type === 'rent'} onChange={handleChange} />
              <span>Rent</span>
            </div> 
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='sale' className='w-5 h-5' checked={sidebarData.type === 'sale'} onChange={handleChange} />
              <span>Sale</span>
            </div> 
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='offer' className='w-5 h-5' checked={sidebarData.offer} onChange={handleChange} />
              <span>Offer</span>
            </div> 
          </div>
          <div className='flex items-center gap-2 flex-wrap mb-4'>
            <label className='whitespace-nowrap font-medium'>Amenities</label>
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='parking' className='w-5 h-5'  checked={sidebarData.parking} onChange={handleChange}/>
              <span>Parking</span>
            </div> 
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='furnished' className='w-5 h-5'  checked={sidebarData.furnished} onChange={handleChange}/>
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <label htmlFor='sort_order' className='font-medium'>Sort:</label>
            <select  onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-90 transition-opacity w-full'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
            {!loading && listings.length === 0 && (
                <p className='text-xl text-slate-700'>No listing found!</p>
            )}

            {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

            {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
            )}

        </div>
      </div>
    </div>
  )
}
