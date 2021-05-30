#!/usr/bin/env bash

args="--build-arg REACT_APP_API_SEARCH=${REACT_APP_API_SEARCH} --build-arg REACT_APP_API_SEARCH=${REACT_APP_API_SEARCH} --build-arg REACT_APP_API_SEARCH=${REACT_APP_API_SEARCH_CREATE} --build-arg REACT_APP_API_SEARCH=${REACT_APP_API_SEARCH_DELETE} --build-arg REACT_APP_API_SEARCH=${REACT_APP_API_ITEMS_DELETE} --build-arg REACT_APP_API_SEARCH=${REACT_APP_API_SCRAP}"


while getopts v: flag
do
    case "${flag}" in
        v) version=${OPTARG};;
    esac
done

# create image
if [[ ! -z "$version" ]]
    then
        docker build -t santohi/jumpfe:$version . ${args} || exit -1
        # echo "Version $version"
    else
        echo "Version not passed. Ex: -v=x.y"
fi
