package com.coyoapp.tinytask.utils;

import java.util.Map;

/**
 * @author Owori Juma
 */
public class CustomEntry<K extends Object, V extends Object> implements Map.Entry<K, V> {
    private K k;
    private V v;

    public CustomEntry(K k, V v) {
        this.k = k;
        this.v = v;
    }

    public CustomEntry() {

    }

    /**
     * Used to set key and value. Used especially when using the default constructor
     *
     * @param k
     * @param v
     */
    public void set(K k, V v) {
        this.k = k;
        this.v = v;
    }

    @Override
    public K getKey() {
        return k;
    }

    @Override
    public V getValue() {
        return v;
    }

    @Override
    public V setValue(V v) {
        this.v = v;
        return this.v;
    }

    public boolean hasKey() {
        return k != null;
    }

    public boolean hasKeyAndValue() {
        return (k != null) && (v != null);
    }

    @Override
    public String toString() {
        return "Key: " + k + ", Value: " + v;
    }
}
